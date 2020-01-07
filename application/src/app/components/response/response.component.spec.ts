import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Response } from 'appflow-payment-initiation-api';

import { ResponseComponent } from './response.component';
import { BasketComponent } from '../basket/basket.component';
import { AdditionalDataComponent } from '../additional-data/additional-data.component';
import { AmountFormatComponent } from '../amount-format/amount-format.component';

describe('ResponseComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TestHostComponent,
        ResponseComponent,
        BasketComponent,
        AdditionalDataComponent,
        AmountFormatComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display request type', () => {
    expectTableValue(1, "reversal");
  });

  it('should display outcome', () => {
    expectTableValue(3, "true");
  });

  it('should display outcome message', () => {
    expectTableValue(5, "Reversed transaction: 39e2e610-c4e2-4e4d-92f6-d21fdae1083b");
  });

  function expectTableValue(index: number, expected: string) {
    expect(fixture.nativeElement.querySelectorAll('td')[index].innerHTML).toBe(expected);
  }

  @Component({
    selector: `host-component`,
    template: `<av-response [response]="response"></av-response>`
  })
  class TestHostComponent {
    response = Response.fromJson(JSON.stringify(responseData));
  }

  const responseData = { 
      "flowServiceId": "com.aevi.sdk.pos.flow.paymentservicesample", 
      "originatingRequest": { 
          "processInBackground": true, 
          "requestData": { 
              "data": { 
                  "merchantId": { 
                      "type": "java.lang.String", 
                      "value": "87654321" 
                  }, 
                  "transactionDateTime": { 
                      "type": "java.lang.String", 
                      "value": "1574338333585" 
                  }, 
                  "sampleTransactionReference": { 
                      "type": "java.lang.String", 
                      "value": "39e2e610-c4e2-4e4d-92f6-d21fdae1083b" 
                  }, 
                  "terminalId": { 
                      "type": "java.lang.String", 
                      "value": "12345678" 
                  }, 
                  "merchantName": { 
                      "type": "java.lang.String", 
                      "value": "Sample Merchant" 
                  } 
              } 
          }, 
          "requestType": "reversal", 
          "id": "2168fc00-36e4-4d72-929c-47a0e4caf4a7" 
      }, 
      "outcomeMessage": "Reversed transaction: 39e2e610-c4e2-4e4d-92f6-d21fdae1083b", 
      "processedInBackground": true, 
      "responseData": { "data": {} }, 
      "success": true, 
      "id": "2168fc00-36e4-4d72-929c-47a0e4caf4a7" 
  };
});
