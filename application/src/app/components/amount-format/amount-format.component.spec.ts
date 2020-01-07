import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountFormatComponent } from './amount-format.component';

describe('AppAmountFormatComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, AmountFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(hostFixture).toBeTruthy();
  });

  it('should display amount correctly', () => {
    setupAndCheckAmount(1000, "GBP", "£10.00");
    setupAndCheckAmount(1234, "USD", "$12.34");
    setupAndCheckAmount(50000, "EUR", "€500.00");
  });

  function setupAndCheckAmount(amount: number, currency: string, expected: string) {
    hostComponent.amount = amount;
    hostComponent.currency = currency;

    hostFixture.detectChanges();
    
    var text = hostFixture.nativeElement.children[0].textContent;
    expect(text).toContain(expected);
  }

  @Component({
    selector: `host-component`,
    template: `<av-amount-format [amount]="amount" [currency]="currency"></av-amount-format>`
  })
  class TestHostComponent {
    amount: number;
    currency: string;
  }
});
