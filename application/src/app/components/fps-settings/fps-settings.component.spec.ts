import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpsSettingsComponent } from './fps-settings.component';
import { FpsSettings } from 'appflow-payment-initiation-api';

describe('FpsSettingsComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TestHostComponent,
        FpsSettingsComponent 
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
    template: `<av-fps-settings [fpsSettings]="fpsSettings"></av-fps-settings>`
  })
  class TestHostComponent {
    fpsSettings = new FpsSettings();
  }
});
