import { Component, OnInit, Input } from '@angular/core';
import { Basket } from 'appflow-payment-initiation-api';

@Component({
  selector: 'av-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

    @Input() title: string;
    @Input() basket: Basket;
    @Input() currency: string;

    constructor() { }

    ngOnInit() {
    }
}
