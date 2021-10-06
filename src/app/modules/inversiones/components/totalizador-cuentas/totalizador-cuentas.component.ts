import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';
import { Saldo } from '../../../../shared/models/saldo';
import { DescripcionMoneda } from '../../../../shared/models/moneda';
import { CONSTANTES } from '../../constants';

@Component({
  selector: 'ftya-totalizador-cuentas',
  templateUrl: './totalizador-cuentas.component.html',
  styleUrls: [
    './totalizador-cuentas.component.scss'
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('400ms ease-in', style({ opacity: 0 })),
      ])
    ])
  ]
})
export class TotalizadorCuentasComponent implements OnInit, OnChanges {
  fechaActual: Date;
  tieneCuentaDolares: boolean;
  textoError = CONSTANTES.ERROR.BANNER.SALDOS;

  @Input() saldos: Saldo[];
  @Input() tieneError = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'icon-warning',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/icon-warning-badge.svg')
    );
  }

  ngOnInit(): void {
    this.fechaActual = new Date();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.saldos && this.saldos) {
      this.tieneCuentaDolares = this.saldos.some(saldo => saldo.moneda.descripcion === DescripcionMoneda.Dolares);
    }
  }
}
