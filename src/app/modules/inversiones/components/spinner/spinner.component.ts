import { Component, Input } from '@angular/core';

@Component({
  selector: 'ftya-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  @Input() size = 40;

}
