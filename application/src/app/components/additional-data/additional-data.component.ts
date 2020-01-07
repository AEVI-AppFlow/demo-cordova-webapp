import { Component, OnInit, Input } from '@angular/core';

import { AdditionalData } from 'appflow-payment-initiation-api';

@Component({
  selector: 'av-additional-data',
  templateUrl: './additional-data.component.html',
  styleUrls: ['./additional-data.component.scss']
})
export class AdditionalDataComponent implements OnInit {

  @Input()
  additionalData: AdditionalData;

  @Input()
  title: string;

  constructor() { }

  ngOnInit() {
  }

}
