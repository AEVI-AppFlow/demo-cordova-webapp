import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentSettings, PaymentFlowServiceInfo } from 'appflow-payment-initiation-api';
import { AppFlowService } from 'src/app/services/app-flow.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlowServiceComponent } from 'src/app/components/flow-service/flow-service.component';

@Component({
  selector: 'av-flow-services',
  templateUrl: './flow-services.component.html',
  styleUrls: ['./flow-services.component.scss']
})
export class FlowServicesComponent implements OnInit {

  paymentSettings: Observable<PaymentSettings>;

  constructor(private appFlow: AppFlowService, private modalService: NgbModal) { 
    this.paymentSettings = this.appFlow.getPaymentClient().getPaymentSettings();
  }

  public openFlowService($event: Event, flowService: PaymentFlowServiceInfo) {
    if(!this.modalService.hasOpenModals()) {
      $event.preventDefault();
      $event.stopPropagation();
      const modalRef = this.modalService.open(FlowServiceComponent);
      modalRef.componentInstance.flowService = flowService;
    }
  }

  ngOnInit() {
  }

}
