import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FlowException } from 'appflow-payment-initiation-api';

@Component({
  selector: 'av-flow-exception',
  templateUrl: './flow-exception.component.html',
  styleUrls: ['./flow-exception.component.scss']
})
export class FlowExceptionComponent implements OnInit {

  @Input() 
  flowException: FlowException;

  constructor(private activeModal: NgbActiveModal) { }

  public dismiss() {
    this.activeModal.dismiss();
  }

  ngOnInit() {
  }

}
