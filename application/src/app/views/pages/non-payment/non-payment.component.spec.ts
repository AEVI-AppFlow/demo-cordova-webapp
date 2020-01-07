import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonPaymentComponent } from './non-payment.component';
import { AmountFormatComponent } from 'src/app/components/amount-format/amount-format.component';

describe('NonePaymentComponent', () => {
  let component: NonPaymentComponent;
  let fixture: ComponentFixture<NonPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        NonPaymentComponent,
        AmountFormatComponent
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
