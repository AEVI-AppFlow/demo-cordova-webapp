import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentResponseComponent } from './payment-response.component';
import { AmountFormatComponent } from '../amount-format/amount-format.component';
import { AmountsDisplayComponent } from '../amounts-display/amounts-display.component';
import { CustomerDisplayComponent } from '../customer-display/customer-display.component';
import { BasketComponent } from '../basket/basket.component';
import { CreditCardComponent } from '../credit-card/credit-card.component';
import { AdditionalDataComponent } from '../additional-data/additional-data.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('PaymentResponseComponent', () => {
  let component: PaymentResponseComponent;
  let fixture: ComponentFixture<PaymentResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PaymentResponseComponent, 
        AmountFormatComponent, 
        AmountsDisplayComponent,
        CustomerDisplayComponent,
        BasketComponent,
        CreditCardComponent,
        AdditionalDataComponent        
      ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(PaymentResponseComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
