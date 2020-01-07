import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'appflow-payment-initiation-api';

@Component({
  selector: 'av-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

    @Input() card: Card;
    @Input() title: string;

    constructor() { }

    ngOnInit() {
    }

}
