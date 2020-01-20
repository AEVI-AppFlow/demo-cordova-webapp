import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentApi, PaymentSettings, PaymentClient } from 'appflow-payment-initiation-api';
import { AppFlowService } from 'src/app/services/app-flow.service';

@Component({
  selector: 'av-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pa: PaymentApi;
  paymentClient: PaymentClient;

  processingServiceInstalled: Promise<boolean>;
  processingServiceVersion: Promise<string>;
  apiVersion: Promise<string>;
  paymentSettings: Observable<PaymentSettings>;

  constructor(private appFlow: AppFlowService) {
    this.pa = this.appFlow.getPaymentApi();
    this.paymentClient = this.appFlow.getPaymentClient();

    this.processingServiceInstalled = this.pa.isProcessingServiceInstalled();
    this.processingServiceVersion = this.pa.getProcessingServiceVersion();
    this.apiVersion = this.pa.getApiVersion();
    this.paymentSettings = this.paymentClient.getPaymentSettings();
  }

  ngOnInit() {

  }
}