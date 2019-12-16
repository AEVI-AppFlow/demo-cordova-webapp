import { Component, OnInit, Input } from '@angular/core';
import { Response, AdditionalDataKeys, Customer, Token, AdditionalData, Basket } from 'appflow-payment-initiation-api';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'av-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  @Input() 
  response: Response

  transactionSection: string;

  constructor(private modalService: NgbModal) { }

  public dismiss() {
    this.modalService.dismissAll();
  }

  public getCustomerFromResponse(response: Response): Customer {
    return response.responseData.getValue(AdditionalDataKeys.DATA_KEY_CUSTOMER, Customer);
  }

  public getTokenFromResponse(response: Response): Token {
    return response.responseData.getValue(AdditionalDataKeys.DATA_KEY_TOKEN, Token);
  }

  public getOtherDataFromResponse(response: Response): AdditionalData {
    if(!response.responseData.isEmpty()) {
      return response.responseData;
    }
  }

  public getBasketFromResponse(response: Response): Basket {
    return response.responseData.getValue("basketUpdated", Basket);
  }

  ngOnInit() {
  }

}
