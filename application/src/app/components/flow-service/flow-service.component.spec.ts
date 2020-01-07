import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowServiceComponent } from './flow-service.component';
import { PaymentFlowServiceInfo } from 'appflow-payment-initiation-api';


describe('FlowServiceComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TestHostComponent, 
        FlowServiceComponent 
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


  @Component({
    selector: `host-component`,
    template: `<av-flow-service [flowService]="flowService"></av-flow-service>`
  })
  class TestHostComponent {
    flowService = new PaymentFlowServiceInfo();
  }
});
