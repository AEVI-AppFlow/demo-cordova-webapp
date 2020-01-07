import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaymentResponse } from 'appflow-payment-initiation-api';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'av-payment-response',
  templateUrl: './payment-response.component.html',
  styleUrls: ['./payment-response.component.scss']
})
export class PaymentResponseComponent implements OnInit {

  @Input() 
  paymentResponse: PaymentResponse;

  constructor(private activeModal: NgbActiveModal) { }

  public setPaymentResponse(paymentResponse: PaymentResponse) {
    this.paymentResponse = paymentResponse;
  }

  public doVoid() {
    this.activeModal.close(this.paymentResponse);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  ngOnInit() {
  }

}
