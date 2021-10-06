import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ftya-stepper-onboarding',
  templateUrl: './stepper-onboarding.component.html',
  styleUrls: ['./stepper-onboarding.component.scss'],
  providers: [
    { provide: CdkStepper, useExisting: StepperOnboardingComponent }
  ]
})
export class StepperOnboardingComponent extends CdkStepper  {

  @Input() ocultarStepper = false;
}
