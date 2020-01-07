import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountsDisplayComponent } from './amounts-display.component';
import { AmountFormatComponent } from '../amount-format/amount-format.component';
import { Amounts } from 'appflow-payment-initiation-api';

describe('AppAmountsDisplayComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TestHostComponent,
        AmountsDisplayComponent,        
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

  it('should display correct base amount', () => {
    setupAmountsAndCheck(1213, "GBP", 0, "£12.13");
    setupAmountsAndCheck(1637, "USD", 0, "$16.37");
  });

  it('should display correct total amount', () => {
    setupAmountsAndCheck(1027, "GBP", 1, "£10.27");
    setupAmountsAndCheck(1835, "USD", 1, "$18.35");
  });

  it('should display correct total amount with additionals', () => { 
    setupAmountsAndCheck(1213, "GBP", 2, "£32.13", { "tax": 2000 });

    setupAmountsAndCheck(1213, "GBP", 0, "£12.13", { "tax": 2000, "bananas": 250 });
    setupAmountsAndCheck(1213, "GBP", 1, "£2.50", { "tax": 2000, "bananas": 250 });
    setupAmountsAndCheck(1213, "GBP", 2, "£20.00", { "tax": 2000, "bananas": 250 });
    setupAmountsAndCheck(1213, "GBP", 3, "£34.63", { "tax": 2000, "bananas": 250 });
  });

  it('should display title correctly', () => {
    component.title = "Lord of the Rings";

    checkSelectorContains('th > div', "Lord of the Rings");
  });

  it('should display outcome correctly', () => {
    component.outcome = "CHEESE";

    checkSelectorContains('span', "CHEESE");
  });

  it('should display outcome message correctly', () => {
    component.message = "Listen very carefully... I shall say this only once";

    checkSelectorContains('td', "Listen very carefully... I shall say this only once");
  });

  function checkSelectorContains(selector: string, expected: string) {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector(selector).textContent).toContain(expected);
  }

  function setupAmountsAndCheck(amount: number, currency: string, index: number, expected: string, additionalAmounts?: {[name: string]: number;}) {
    component.amounts = Amounts.from(amount, currency, additionalAmounts);

    fixture.detectChanges();
    
    expectElementValue(index, "av-amount-format", expected);
  }

  function expectElementValue(index: number, elementName: string, expected: string) {  
    expect(fixture.nativeElement.querySelectorAll(elementName)[index].textContent).toContain(expected);
  }

  @Component({
    selector: `host-component`,
    template: `<av-amounts-display [amounts]="amounts" [title]="title" [outcome]="outcome" [outcomeMessage]="message"></av-amounts-display>`
  })
  class TestHostComponent {
    amounts: Amounts;
    title: string;
    outcome: string;
    message: string;
  }
});
