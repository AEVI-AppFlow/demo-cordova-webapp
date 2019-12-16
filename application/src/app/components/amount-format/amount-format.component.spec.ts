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
    var text = hostFixture.nativeElement.children[0].textContent;
    expect(text.trim()).toBe("£10.00");
  });

  @Component({
    selector: `host-component`,
    template: `<av-amount-format amount="1000" currency="GBP"></av-amount-format>`
  })
  class TestHostComponent {
  }
});
