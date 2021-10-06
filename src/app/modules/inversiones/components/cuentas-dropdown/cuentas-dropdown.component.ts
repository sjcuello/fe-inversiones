import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cuenta } from '../../../../shared/models/cuenta';
import { NumeroDecimalPipe } from 'src/app/shared/pipes/numero-decimal.pipe';
import { TipoNombreCuentaAbreviadaPipe } from 'src/app/shared/pipes/tipo-nombre-cuenta-abreviada.pipe';

@Component({
  selector: 'ftya-cuentas-dropdown',
  templateUrl: './cuentas-dropdown.component.html',
  styleUrls: ['./cuentas-dropdown.component.scss']
})
export class CuentasDropdownComponent implements OnInit {
  cuentaSeleccionada: string;

  @Input() cuentas: Cuenta[];
  @Input() cuentaPredeterminada?: Cuenta;
  @Input() label = '';
  @Output() accionSeleccionarCuenta = new EventEmitter<Cuenta>();

  constructor(private numeroDecimal: NumeroDecimalPipe,
              private nombreCuentaAbreviada: TipoNombreCuentaAbreviadaPipe) { }

  ngOnInit(): void {
    if (this.cuentaPredeterminada) {
      this.cuentaSeleccionada = this.cuentaPredeterminada.identificador;
    }
  }

  seleccionarCuenta(cuenta) {
    this.cuentaSeleccionada = cuenta.value;
    this.accionSeleccionarCuenta.emit(cuenta.value);
  }

  generarOpcionesDropdownCuentas(cuenta: Cuenta) {
    const textoCuenta = `${this.nombreCuentaAbreviada.transform(cuenta.tipo_cuenta)} N° ${cuenta.numero}`;
    const textoSaldo = cuenta.saldo ? `Saldo: ${cuenta.moneda.simbolo} ${this.numeroDecimal.transform(cuenta.saldo)}`
      : 'Sin saldo';

    return `${textoCuenta}
            ${textoSaldo}`;
  }
}
