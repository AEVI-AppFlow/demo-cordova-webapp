import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'appflow-payment-initiation-api';

@Component({
    selector: 'av-customer-display',
    templateUrl: './customer-display.component.html',
    styleUrls: ['./customer-display.component.scss']
})
export class CustomerDisplayComponent implements OnInit {

    @Input() customer: Customer;

    constructor() {
    }

    ngOnInit() {
    }

}
