import { Component, OnInit, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PaymentSettings, PaymentResponse, Request, Response, Amounts, FlowConfig, AdditionalData, FlowTypes, Basket, BasketItemBuilder, TransactionResponse, TransactionResponseOutcome, Transaction, Customer, CustomerDataKeys, Token, StatusUpdateKeys, ReceiptKeys, AdditionalDataKeys, PaymentMethods } from 'appflow-payment-initiation-api';

import { AppFlowService } from 'src/app/services/app-flow.service';
import { ResponseComponent } from 'src/app/components/response/response.component';

const SHOW_LOYALTY_POINTS_REQUEST = "showLoyaltyPointsBalance";

@Component({
  selector: 'av-non-payment',
  templateUrl: './non-payment.component.html',
  styleUrls: ['./non-payment.component.scss']
})
export class NonPaymentComponent implements OnInit {

  private nonPaymentFlowTypes = ["tokenisation", "reversal", "receiptDelivery", SHOW_LOYALTY_POINTS_REQUEST, "basketStatusUpdate", "unsupportedFlowType"];
  private receiptDeliveryTypes = ["cash", "redeliver"];

  private responseSubscription: Subscription;  

  requestInProgress: boolean = false;
  response: Observable<Response>;
  paymentSettings: Observable<PaymentSettings>;
  flowName = this.nonPaymentFlowTypes[0];
  subType = this.receiptDeliveryTypes[0];
  runInBackground = false;
  hasPaymentResponse = false;
  lastResponse: PaymentResponse;

  constructor(private appFlow: AppFlowService, private modalService: NgbModal, private zone: NgZone) { 
    this.response = this.appFlow.getPaymentClient().subscribeToResponses().pipe(share());
    this.hasPaymentResponse = this.checkForPaymentAppResponse(appFlow.getLastResponse()) != null;
    this.paymentSettings = this.appFlow.getPaymentClient().getPaymentSettings();
    this.responseSubscription = this.appFlow.observeResponses().subscribe((response) => {
      this.zone.run(() => {
        console.log("Got non-payment response");
        console.log(response)
        const modalRef = this.modalService.open(ResponseComponent);
        modalRef.componentInstance.response = response;
        modalRef.result.then((data) => {
          this.requestInProgress = false;
        }, (reason) => {
          this.requestInProgress = false;        
        });
      });
    });

    this.lastResponse = this.appFlow.getLastResponse();
  }

  public isUseableFlow(itemList: FlowConfig[]): FlowConfig[] {
    let result: FlowConfig[] = [];
    for(let item of itemList) {
      if(this.nonPaymentFlowTypes.includes(item.type)) {
        result.push(item);
      }
    }
    return result;
  }

  public makeRequest() {
    if(!this.requestInProgress) {
        this.requestInProgress = true;
        var request = this.createRequest();
        console.log("Sending request");
        console.log(request);
        this.appFlow.getPaymentClient().initiateRequest(request).then((response) => {
          console.log(response);
        }).catch((error)  => {
          // TODO show error in app
          console.log("Failed to initiate request");
          console.log(error);
        });
    }
  }

  private createRequest(): Request {

    var requestData = new AdditionalData();

    // Some types require additional information
    switch (this.flowName) {
        case FlowTypes.BASKET_STATUS_UPDATE: {
            var basket = Basket.fromItems("sampleBasket", new BasketItemBuilder().withLabel("item").withAmount(200).build());
            requestData.addData(StatusUpdateKeys.STATUS_UPDATE_BASKET_MODIFIED, basket);
            break;
        }
        case FlowTypes.REVERSAL: {
            var paymentAppResponse = this.checkForPaymentAppResponse(this.lastResponse);
            if (!paymentAppResponse) {
                return null;
            }
            requestData = paymentAppResponse.references;
            break;
        }
        case FlowTypes.RECEIPT_DELIVERY: {
            // Some types require additional information
            if (this.subType == "redeliver") {
                requestData.addData(AdditionalDataKeys.DATA_KEY_TRANSACTION, this.lastResponse.transactions[0]);
            } else if (this.subType == "cash") {
                requestData.addData(ReceiptKeys.RECEIPT_AMOUNTS, Amounts.from(15000, "EUR"));
                requestData.addData(ReceiptKeys.RECEIPT_PAYMENT_METHOD, PaymentMethods.PAYMENT_METHOD_CASH);
                requestData.addData(ReceiptKeys.RECEIPT_OUTCOME, TransactionResponseOutcome.APPROVED);
            }
            break;
        }
        case SHOW_LOYALTY_POINTS_REQUEST: {
            requestData.addData(AdditionalDataKeys.DATA_KEY_CUSTOMER, this.getDefaultCustomer("Payment Initiation Sample"));
            break;
        }
        default:
            // No extra data required
            break;
    }

    var request = Request.from(this.flowName, requestData);
    // Indicate whether or not to process request in background - make sure to read docs to understand implications of this
    request.processInBackground = this.runInBackground;

    return request;
  }

  private getDefaultCustomer(source: string): Customer {
    var customer = new Customer();
    customer.fullName = "Joanna Doe";
    customer.addCustomerDetails(CustomerDataKeys.EMAIL, "joanna@doe.com");
    customer.addCustomerDetails(CustomerDataKeys.PHONE, "12345678");
    customer.addCustomerDetails("generatedBy", source);
    customer.tokens.push(Token.from("267367367", "card", "random"));
    return customer;
  }

  private getFirstTransaction(lastResponse: PaymentResponse): Transaction {
    if (lastResponse != null && lastResponse.transactions.length > 0 && lastResponse.transactions[0].hasResponses()) {
        return lastResponse.transactions[0];
    }
    return null;
  }

  private checkForPaymentAppResponse(lastResponse: PaymentResponse): TransactionResponse {
    var firstTransaction = this.getFirstTransaction(lastResponse);
    if (firstTransaction == null || firstTransaction.getPaymentAppResponse() == null) {
        return null;
    }
    return firstTransaction.getPaymentAppResponse();
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.responseSubscription.unsubscribe();
  }
}
