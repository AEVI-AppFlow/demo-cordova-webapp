import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowExceptionComponent } from './flow-exception.component';

describe('FlowExceptionComponent', () => {
  let component: FlowExceptionComponent;
  let fixture: ComponentFixture<FlowExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
