import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { FlowEvent } from 'appflow-payment-initiation-api';
import { AppFlowService, FlowEventRecord } from 'src/app/services/app-flow.service';

@Component({
  selector: 'av-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {


  flowEvents: Observable<Array<FlowEventRecord>>;

  constructor(private appFlow: AppFlowService, private cdRef: ChangeDetectorRef) { 
    this.flowEvents = this.appFlow.getFlowEvents().pipe(tap(val =>  this.cdRef.detectChanges()));
  }

  ngOnInit() {
  }
}
