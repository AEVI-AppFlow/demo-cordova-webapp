import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'av-amount-format',
  templateUrl: './amount-format.component.html',
  styleUrls: ['./amount-format.component.scss']
})
export class AmountFormatComponent implements OnInit {

    @Input() amount: number;
    @Input() currency: string;

    constructor() { }

    ngOnInit() {
    }

}
