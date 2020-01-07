import { Injectable, OnDestroy } from '@angular/core';
import { Observable, NEVER, concat, of, Subscription, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentApi, Payment, PaymentResponse, PaymentClient, FlowEvent, FlowTypes, Request, Response } from 'appflow-payment-initiation-api';
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

@Injectable({
  providedIn: 'root'
})
export class AppFlowService implements OnDestroy {

  private responseSubscription: Subscription;
  private paymentResponseSubscription: Subscription;
  
  private pa: PaymentApi;
  private lastPaymentResponse: PaymentResponse;
  private flowEventsArr: Array<FlowEventRecord> = new Array();  

  private responseSubject = new Subject<Response>();
  private paymentResponseSubject = new Subject<PaymentResponse>();

  constructor() { 
    this.pa = PaymentApiCordova.getInstance();
    Object.assign(this.flowEventsArr, JSON.parse(localStorage.getItem(LAST_EVENTS)));
  
    // listen for void responses
    this.responseSubscription = this.getPaymentClient().subscribeToResponses().subscribe((response) => {
      console.log("Got non-payment response");
      console.log(response)
      this.responseSubject.next(response);
    });

    // list for payment responses
    this.paymentResponseSubscription = this.getPaymentClient().subscribeToPaymentResponses().subscribe((paymentResponse) => {
      console.log("Got payment response");
      console.log(paymentResponse)
      this.setLastResponse(paymentResponse);
      this.paymentResponseSubject.next(paymentResponse);
    });
  }

  public sendVoidRequest(voidResponse: PaymentResponse) {
    var request = this.createVoidRequest(voidResponse);
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
    this.getPaymentClient().initiatePayment(payment).then((response) => {
      console.log(response);
    }).catch((error)  => {
      // TODO show error in app
      console.log("Failed to initiate payment");
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

  public observePaymentResponses(): Observable<PaymentResponse> {
    return this.paymentResponseSubject.asObservable();
  }

  public observeResponses(): Observable<Response> {
    return this.responseSubject.asObservable();
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
  }

}
