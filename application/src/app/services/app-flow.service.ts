import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { Observable, NEVER, concat, of, Subscription, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PaymentApi, Payment, PaymentResponse, PaymentClient, FlowEvent, FlowTypes, Request, Response, FlowException } from 'appflow-payment-initiation-api';
import { PaymentApiCordova } from 'appflow-cordova-plugin';

import { PaymentResponseComponent } from 'src/app/components/payment-response/payment-response.component';
import { ResponseComponent } from 'src/app/components/response/response.component';

const LAST_RESPONSE = "lastResponse";
const LAST_EVENTS = "lastEvents";

export class FlowEventRecord {
  timestamp: string;
  flowEvent: FlowEvent;

  constructor(flowEvent: FlowEvent) {
    this.timestamp = new Date().toUTCString();
    this.flowEvent = flowEvent;
  }
}

/**
 * A service class so that we only subscribe to app flow observables in one place that can be shared throughout the application
 */
@Injectable({
  providedIn: 'root'
})
export class AppFlowService implements OnDestroy {

  private responseSubscription: Subscription;
  private paymentResponseSubscription: Subscription;
  private paymentErrorSubscription: Subscription;
  private genericErrorSubscription: Subscription;
  
  private pa: PaymentApi;
  private lastPaymentResponse: PaymentResponse;
  private flowEventsArr: Array<FlowEventRecord> = new Array();  

  private paymentInProgressSubject = new ReplaySubject<boolean>(1);

  constructor(private modalService: NgbModal, private zone: NgZone) { 
    this.pa = PaymentApiCordova.getInstance();
    Object.assign(this.flowEventsArr, JSON.parse(localStorage.getItem(LAST_EVENTS)));
  
    this.paymentInProgressSubject.next(false);

    // listen for void responses
    this.responseSubscription = this.getPaymentClient().subscribeToResponses().subscribe((response) => {
      console.log("Got non-payment response");
      console.log(response)
      this.zone.run(() => { // this is required to allow the modal to popup correctly in the angular zone
        const modalRef = this.modalService.open(ResponseComponent);
        modalRef.componentInstance.response = response;
        modalRef.result.then((modalResponse) => {
          this.paymentInProgressSubject.next(false);
        }, (reason) => {
          this.paymentInProgressSubject.next(false);
        });      
      });
    });

    // list for payment responses
    this.paymentResponseSubscription = this.getPaymentClient().subscribeToPaymentResponses().subscribe((paymentResponse) => {
      console.log("Got payment response");
      console.log(paymentResponse)
      this.setLastResponse(paymentResponse);
      this.zone.run(() => { // this is required to allow the modal to popup correctly in the angular zone
        const modalRef = this.modalService.open(PaymentResponseComponent);
        modalRef.componentInstance.setPaymentResponse(paymentResponse);
        modalRef.result.then((voidResponse) => {
          this.paymentInProgressSubject.next(false);
          if(voidResponse) {
            // a request from the user to void this request
            this.sendVoidRequest(voidResponse);
          }
        }, (reason) => {
          this.paymentInProgressSubject.next(false);
        });      
      });
    });

    this.paymentErrorSubscription = this.getPaymentClient().subscribeToPaymentResponseErrors().subscribe((error) => {
      console.log("Received an error from a payment request");
      console.log(error);
      // TODO show error in app
    });

    this.genericErrorSubscription = this.getPaymentClient().subscribeToResponseErrors().subscribe((error) => {
      console.log("Received an error from a generic request");
      console.log(error);
      // TODO show error in app
    });
  }

  public sendVoidRequest(responseToVoid: PaymentResponse) {
    var request = this.createVoidRequest(responseToVoid);
    if(request) {
      this.getPaymentClient().initiateRequest(request).then((response) => {
        console.log(response);
      }).catch((error)  => {
        // TODO show error in app
        console.log("Failed to initiate request");
        console.log(error);
      });
    } else {
      console.log("Failed to create void from response");
    }
  }

  private createVoidRequest(voidResponse: PaymentResponse) {
    // Get the relevant Transaction details to send to the processing service so that it can be voided
    // We know for our sample payment service there will only ever be 1 Transaction object. This may or may not be the case for other Payment Services
    if (voidResponse != null && voidResponse.transactions.length > 0 && voidResponse.transactions[0].hasResponses()) {
      var firstTransaction = voidResponse.transactions[0];
      if (firstTransaction == null || firstTransaction.getPaymentAppResponse() == null) {
          return null;
      }
      var transaction = firstTransaction.getPaymentAppResponse();
      return Request.from(FlowTypes.REVERSAL, transaction.references);
    }
  }

  public getPaymentApi(): PaymentApi {
    return this.pa;
  }

  public getPaymentClient(): PaymentClient {
    return this.pa.getPaymentClient();
  }

  public initiatePayment(payment: Payment) {
    this.paymentInProgressSubject.next(true);
    this.getPaymentClient().initiatePayment(payment).then((response) => {
      console.log(response);
    }).catch((error)  => {
      // TODO show error in app
      console.log("Failed to initiate payment");
      console.log(error);
    });
  }

  public initiateRequest(request: Request) {
    this.paymentInProgressSubject.next(true);
    this.getPaymentClient().initiateRequest(request).then((response) => {
      console.log(response);
    }).catch((error)  => {
      // TODO show error in app
      console.log("Failed to initiate generic request");
      console.log(error);
    });
  }

  public setLastResponse(paymentResponse: PaymentResponse) {
    this.lastPaymentResponse = paymentResponse;
    localStorage.setItem(LAST_RESPONSE, paymentResponse.toJson());
  }

  public getLastResponse(): PaymentResponse {
    if(!this.lastPaymentResponse) {
      this.lastPaymentResponse = PaymentResponse.fromJson(localStorage.getItem(LAST_RESPONSE));
    }
    return this.lastPaymentResponse;
  }

  public getFlowEvents(): Observable<Array<FlowEventRecord>> {
    return concat(
      of(this.flowEventsArr),
      this.pa.getPaymentClient().subscribeToSystemEvents().pipe(
        map(flowEvent => {
          console.log("Got event in events comp");
          console.log(flowEvent);
          this.flowEventsArr.splice(0, 0, new FlowEventRecord(flowEvent));
          if(this.flowEventsArr.length > 5) {
            this.flowEventsArr.pop();
          }
        
          localStorage.setItem(LAST_EVENTS, JSON.stringify(this.flowEventsArr));
          return this.flowEventsArr;
        })
      )
    );
  }

  public getPaymentInProgressObservable(): Observable<boolean> {
    return this.paymentInProgressSubject.asObservable();
  }

  ngOnDestroy() {
    console.log('Service destroy');
    if(this.responseSubscription) {
      this.responseSubscription.unsubscribe();
      this.responseSubscription = null;
    }

    if(this.paymentResponseSubscription) {
      this.paymentResponseSubscription.unsubscribe();
      this.paymentResponseSubscription = null;
    }

    if(this.paymentErrorSubscription) {
      this.paymentErrorSubscription.unsubscribe();
      this.paymentErrorSubscription = null;
    }

    if(this.genericErrorSubscription) {
      this.genericErrorSubscription.unsubscribe();
      this.genericErrorSubscription = null;
    }
  }

}
