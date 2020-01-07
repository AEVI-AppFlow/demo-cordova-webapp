import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowConfigComponent } from './flow-config.component';
import { FlowConfig } from 'appflow-payment-initiation-api';

describe('FlowConfigComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TestHostComponent,
        FlowConfigComponent 
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
    template: `<av-flow-config [flowConfig]="flowConfig"></av-flow-config>`
  })
  class TestHostComponent {
    flowConfig = new FlowConfig();
  }
});
