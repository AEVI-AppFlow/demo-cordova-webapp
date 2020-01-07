import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowServicesComponent } from './flow-services.component';

describe('FlowServicesComponent', () => {
  let component: FlowServicesComponent;
  let fixture: ComponentFixture<FlowServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
