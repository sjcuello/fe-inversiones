import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperOnboardingComponent } from './stepper-onboarding.component';

describe('StepperOnboardingComponent', () => {
  let component: StepperOnboardingComponent;
  let fixture: ComponentFixture<StepperOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepperOnboardingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
