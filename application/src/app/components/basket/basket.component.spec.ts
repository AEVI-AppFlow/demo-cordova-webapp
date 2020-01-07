import { Component} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComponent } from './basket.component';
import { AmountFormatComponent } from '../amount-format/amount-format.component';
import { Basket, BasketItem } from 'appflow-payment-initiation-api';

describe('AppBasketComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TestHostComponent,
        BasketComponent,
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

  it('should create and be empty', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('av-basket').textContent).toBe("");
  });

  it('should display the basket name', () => {
    component.title = "Some";
    component.basket = Basket.fromItems("Shizz");

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h5').textContent).toContain("Some");
    expect(fixture.nativeElement.querySelector('h5').textContent).toContain("Shizz");
  });

  it('should display basket items', () => {
    component.currency = "GBP";
    component.basket = getDefaultBasket();

    fixture.detectChanges();

    var basketItems = fixture.nativeElement.querySelectorAll('tbody > tr');
    expect(basketItems.length).toBe(3);
    expectItemValues(basketItems[0].querySelectorAll('td'), "1" ,"Pork", "£12.00");
    expectItemValues(basketItems[1].querySelectorAll('td'), "1" ,"Fanta", "£5.00");
    expectItemValues(basketItems[2].querySelectorAll('td'), "30" ,"Coke", "£3.00");
  });

  it('should display total value', () => {
    component.currency = "GBP";
    component.basket = getDefaultBasket();

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('av-amount-format').textContent).toContain("£107.00");
  });

  function expectItemValues(itemCols: any, quantity: string, label: string, amount: string) {
    expect(itemCols[0].textContent).toBe(quantity);
    expect(itemCols[1].textContent).toBe(label);
    expect(itemCols[2].textContent).toContain(amount);
  }

  function getDefaultBasket(): Basket {
    var sourceBasket = Basket.fromItems("Food");
    sourceBasket.addItems(BasketItem.from("123", "Coke", "Drinks", 300, 10, 30),
                          BasketItem.from("456", "Fanta", "Drinks", 500, 0, 1),
                          BasketItem.from("789", "Pork", "Meat", 1200, 1000, 1));

    return sourceBasket;
  }

  @Component({
    selector: `host-component`,
    template: `<av-basket [basket]="basket" [title]="title" [currency]="currency"></av-basket>`
  })
  class TestHostComponent {
    basket: Basket;
    title: string;
    currency: string;
  }
});
