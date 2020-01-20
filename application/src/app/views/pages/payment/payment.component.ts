import { Component, OnInit, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PaymentBuilder, Amounts, PaymentSettings, FlowConfig, Basket, BasketItemBuilder, BasketItemModifierBuilder, ModifierTypes, Customer, Token, ResponseQueryBuilder, PaymentResponse } from 'appflow-payment-initiation-api';
import { AppFlowService } from 'src/app/services/app-flow.service';
import { PaymentResponseComponent } from 'src/app/components/payment-response/payment-response.component';
import { ResponseComponent } from 'src/app/components/response/response.component';

@Component({
  selector: 'av-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentSettings: Observable<PaymentSettings>;

  paymentResponseQuery: PaymentResponse[];
  
  flowName: string;
  currency: string;  
  amounts = ["10.00", "10.00, tip: 5.00", "10.00, cashback: 5.00", "10.00, tip: 5.00, cashback: 2.50", "0.00"];
  amount: string = this.amounts[0];
  addBasket: boolean;
  addCustomer: boolean;
  addCardToken: boolean;
  enableSplit: boolean;

  paymentInProgress: Observable<Boolean>;


  constructor(private appFlow: AppFlowService, private modalService: NgbModal, private zone: NgZone) { 
    this.paymentSettings = this.appFlow.getPaymentClient().getPaymentSettings();
    this.paymentInProgress = this.appFlow.getPaymentInProgressObservable();
  }

  public makePayment() {
      var paymentBuilder = new PaymentBuilder().withPaymentFlow(this.flowName);

      let amounts: Amounts;
      if (!this.addBasket) {
        amounts = this.getManualAmounts();
      } else {
        let basket = this.createBasket();
        paymentBuilder.withBasket(basket);
        amounts = Amounts.from(basket.getTotalBasketValue(), this.currency);
      }

      paymentBuilder.withAmounts(amounts).withSplitEnabled(this.enableSplit);

      if (this.addCustomer) {
        paymentBuilder.withCustomer(this.getDefaultCustomer("Payment Initiation Sample"));
      }

      if (this.addCardToken) {
        paymentBuilder.withCardToken(this.getCardToken());
      }

      console.log(paymentBuilder.build());
      this.appFlow.initiatePayment(paymentBuilder.build());
  }

  public isUseableFlow(itemList: FlowConfig[]): FlowConfig[] {
    let result: FlowConfig[] = [];
    for(let item of itemList) {
      if(item.type == "sale" || item.type == "refund") {
        result.push(item);
      }
    }
    return result;
  }

  private getManualAmounts(): Amounts {
    var amountValues = this.amount.split(",");
    var baseAmount = parseFloat(amountValues[0].trim()) * 100;
    var amounts = Amounts.from(baseAmount, this.currency);
    if (amountValues.length > 1) {
        for (let i = 1; i < amountValues.length; i++) {
            var additionalAmount = amountValues[i].split(":");
            amounts.addAdditionalAmount(additionalAmount[0].trim(), parseFloat(additionalAmount[1].trim())*100);
        }
    }
    return amounts;
  }

  private createBasket(): Basket {
    return Basket.fromItems("sampleBasket",
          // You can add single count items, with label, category and amount value
          new BasketItemBuilder().withLabel("Flat White").withCategory("coffee")
                  .withBaseAmountAndModifiers(250,
                                              new BasketItemModifierBuilder("Extra shot", ModifierTypes.EXTRA).withAmount(50).build())
                  .build(),
          new BasketItemBuilder().withLabel("Water").withCategory("drinks").withAmount(150).build(),
          // You can also specify the initial count of the item and provide your own id
          new BasketItemBuilder().withId("1234-abcd").withLabel("Chocolate Cake").withCategory("cake").withAmount(250).withQuantity(2)
                  .build(),
          // You can specify quantity as fractional and associate a unit with it
          new BasketItemBuilder()
                  .withLabel("Coffee Beans")
                  .withAmount(458)
                  .withFractionalQuantity(1.5, "kg")
                  .build());
        }

  private getDefaultCustomer(customerName: string): Customer {
    return Customer.from("145452", "Jonny Big Potatoes")
  }

  private getCardToken(): Token {
    return Token.from("15151616", "card");
  }

  public queryPayments() {
    var paymentResponseQuery = new ResponseQueryBuilder()
                                    .withMaxResults(100)
                                    .build();

    this.appFlow.getPaymentClient().queryPaymentResponses(paymentResponseQuery).pipe(toArray()).subscribe(queryResponses => {
      this.zone.run(() => {
        console.log("BLARRRP");
        console.log(queryResponses);
        this.paymentResponseQuery = queryResponses;
      });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {   
  }
}