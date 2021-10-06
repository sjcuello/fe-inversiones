import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Aviso, TipoAviso } from '../../models/aviso';

@Component({
  selector: 'shared-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: [
    './aviso.component.scss'
  ]
})
export class AvisoComponent {
  @Input() alert: Aviso;
  @Input() type: TipoAviso;
  @Input() dismissible = true;
  @Output() close$: EventEmitter<void> = new EventEmitter<void>();

  emitCloseEvent(): void {
    this.close$.emit();
  }

}
