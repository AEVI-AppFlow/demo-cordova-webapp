import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentApi, PaymentSettings, FlowConfig } from 'appflow-payment-initiation-api';
import { AppFlowService } from 'src/app/services/app-flow.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlowConfigComponent } from 'src/app/components/flow-config/flow-config.component';

@Component({
  selector: 'av-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  pa: PaymentApi;

  processingServiceInstalled: Observable<boolean>;
  processingServiceVersion: Observable<string>;
  apiVersion: Observable<string>;
  paymentSettings: Observable<PaymentSettings>;

  constructor(private appFlow: AppFlowService, private modalService: NgbModal) {
    this.pa = this.appFlow.getPaymentApi();
    this.processingServiceInstalled = this.pa.isProcessingServiceInstalled();
    this.processingServiceVersion = this.pa.getProcessingServiceVersion();
    this.apiVersion = this.pa.getApiVersion();
    this.paymentSettings = this.appFlow.getPaymentClient().getPaymentSettings();
  }

  public openFlowConfig($event: Event, flowConfig: FlowConfig) {
    if(!this.modalService.hasOpenModals()) {
      $event.preventDefault();
      $event.stopPropagation();
      const modalRef = this.modalService.open(FlowConfigComponent);
      modalRef.componentInstance.flowConfig = flowConfig;
    }
  }

  ngOnInit() {

  }
}
