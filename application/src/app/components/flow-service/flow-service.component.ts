import { Component, OnInit, Input } from '@angular/core';
import { PaymentFlowServiceInfo } from 'appflow-payment-initiation-api';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'av-flow-service',
  templateUrl: './flow-service.component.html',
  styleUrls: ['./flow-service.component.scss']
})
export class FlowServiceComponent implements OnInit {

  @Input() 
  flowService: PaymentFlowServiceInfo;
  
  constructor(private modalService: NgbModal) { }

  public dismiss() {
    this.modalService.dismissAll();
  }


  ngOnInit() {
  }

}
