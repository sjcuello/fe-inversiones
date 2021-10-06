import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CodigoTeclado } from '../../enums/teclado-enum';
@Component({
  selector: 'ftya-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.scss']
})
export class BotonComponent implements OnInit {

  @Input() tipoBoton = 'primary';
  @Input() textoBoton = '';
  @Input() estaDeshabilitado = false;
  @Input() iconoBoton?: string;
  @Input() iconoBotonDerecha?: string;
  @Input() labelGris?: boolean;
  @Input() cargando?: boolean;
  @Input() customStyle?: string;
  @Output() accionBoton = new EventEmitter<any>();
  colorEjemplo = 'grey';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    if (this.iconoBoton) {
      this.registraBoton(this.iconoBoton);
    }
    if (this.iconoBotonDerecha) {
      this.registraBoton(this.iconoBotonDerecha);
    }
  }

  registraBoton(iconoBoton: string) {
    if (iconoBoton) {
      this.matIconRegistry.addSvgIcon(
        iconoBoton,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/icons/${iconoBoton}.svg`),
      );
    }
  }

  emitirAccionBoton() {
    this.accionBoton.emit();
  }

  emitirPorTeclado(event) {
    if (event.code === CodigoTeclado.Enter || event.code === CodigoTeclado.Space) {
      this.emitirAccionBoton();
    }
  }

  get estaCargando() {
    return this.cargando ? 'tertiary' : this.tipoBoton;
  }
}
