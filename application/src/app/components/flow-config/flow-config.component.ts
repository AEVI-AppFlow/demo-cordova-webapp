import { Component, OnInit, Input } from '@angular/core';
import { FlowConfig } from 'appflow-payment-initiation-api';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'av-flow-config',
  templateUrl: './flow-config.component.html',
  styleUrls: ['./flow-config.component.scss']
})
export class FlowConfigComponent implements OnInit {

  @Input() 
  flowConfig: FlowConfig;

  constructor(private modalService: NgbModal) { }

  public dismiss() {
    this.modalService.dismissAll();
  }

  ngOnInit() {

  }

}
