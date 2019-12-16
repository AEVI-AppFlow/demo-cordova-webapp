import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowConfigComponent } from './flow-config.component';

describe('FlowConfigComponent', () => {
  let component: FlowConfigComponent;
  let fixture: ComponentFixture<FlowConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
