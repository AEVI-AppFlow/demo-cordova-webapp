import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountsDisplayComponent } from './amounts-display.component';

describe('AppAmountsDisplayComponent', () => {
  let component: AmountsDisplayComponent;
  let fixture: ComponentFixture<AmountsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
