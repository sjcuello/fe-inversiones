import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ftya-toggle',
  templateUrl: './toggle.component.html'
})
export class ToggleComponent {
  @Input() pulsado: boolean;
  @Output() cambioEstado: EventEmitter<boolean> = new EventEmitter();

  click() {
    this.pulsado = !this.pulsado;
    this.cambioEstado.emit(this.pulsado);
  }
}
