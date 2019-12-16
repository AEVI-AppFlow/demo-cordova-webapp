import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountFormatComponent } from './amount-format.component';

describe('AppAmountFormatComponent', () => {
  let component: AmountFormatComponent;
  let fixture: ComponentFixture<AmountFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
