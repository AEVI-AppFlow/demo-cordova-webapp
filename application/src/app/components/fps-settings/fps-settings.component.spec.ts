import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpsSettingsComponent } from './fps-settings.component';

describe('FpsSettingsComponent', () => {
  let component: FpsSettingsComponent;
  let fixture: ComponentFixture<FpsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
