import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import animation from '../../../../../assets/animaciones/feedback-check.json';
import { CONSTANTES } from '../../constants';

@Component({
  selector: 'ftya-exito',
  templateUrl: './exito.component.html',
  styleUrls: ['./exito.component.scss']
})
export class ExitoComponent {
  textoBoton = CONSTANTES.GENERICO;

  @Input() titulo: string;
  @Input() subtitulo?: string;
  @Input() textoPie?: string;
  @Input() compra = false;
  @Input() venta = false;
  @Output() accionBoton = new EventEmitter<void>();
  iconoBotonDescarga = 'icon-download-red';
  iconoBotonVerComprobante = 'icon-eye-red';

  textoPasos = CONSTANTES.PAGINA.HOME_DOLAR_MEP.PASOS;
  options: AnimationOptions = {
    animationData: animation,
    loop: false,
  };

  clickBoton() {
    this.accionBoton.emit();
  }
}
