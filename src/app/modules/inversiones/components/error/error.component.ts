import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import animation from '../../../../../assets/animaciones/error-check.json';
import { CONSTANTES } from '../../constants';

@Component({
  selector: 'ftya-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  textoBoton = CONSTANTES.GENERICO.ENTENDIDO;

  @Input() titulo: string;
  @Input() subtitulo?: string;
  @Output() accionBoton = new EventEmitter<void>();

  options: AnimationOptions = {
    animationData: animation,
    loop: false,
  };

  clickBoton() {
    this.accionBoton.emit();
  }
}
