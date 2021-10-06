import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ftya-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    { provide: CdkStepper, useExisting: StepperComponent }
  ]
})
export class StepperComponent extends CdkStepper {
  @Input() deshabilitarStep = false;
  @Input() ocultarStepper = false;

  selectStepIndex(index: number): void {
    this.selectedIndex = index;
  }
}
