import { Component, Input } from '@angular/core';

@Component({
  selector: 'ftya-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent {
  @Input() encendido: boolean;
  @Input() nombreClase: string;
}
