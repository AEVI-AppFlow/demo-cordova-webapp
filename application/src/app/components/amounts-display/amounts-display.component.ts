import { Component, OnInit, Input } from '@angular/core';
import { Amounts } from 'appflow-payment-initiation-api';

@Component({
  selector: 'av-amounts-display',
  templateUrl: './amounts-display.component.html',
  styleUrls: ['./amounts-display.component.scss']
})

export class AmountsDisplayComponent implements OnInit {

    @Input() amounts: Amounts;
    @Input() title: string;
    @Input() outcome: string;
    @Input() outcomeMessage: string;

    constructor() { }

    ngOnInit() {
    }

}
