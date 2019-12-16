import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowServiceComponent } from './flow-service.component';

describe('FlowServiceComponent', () => {
  let component: FlowServiceComponent;
  let fixture: ComponentFixture<FlowServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
