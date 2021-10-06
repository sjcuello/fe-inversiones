import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CONSTANTES } from '../../constants';

@Component({
  selector: 'ftya-monto-input',
  templateUrl: './monto-input.component.html',
  styleUrls: ['./monto-input.component.scss']
})
export class MontoInputComponent implements OnChanges {

  @Input() montoMaximo: number;
  @Input() montoMinimo: number;
  @Input() resetearMonto?: boolean;
  @Output() accionMonto = new EventEmitter<number>();
  muestraMensaje: boolean;
  textosInput = CONSTANTES.GENERICO.INPUT_MONTO;

  formMonto: FormGroup = new FormGroup({
    monto: new FormControl(''),
  });

  constructor() {
    this.formMonto.controls.monto.valueChanges.subscribe(
      monto => {
        if (!monto.includes('$')) {
          const montoNumerico = parseFloat(monto.replace(',', '.'));
          this.accionMonto.emit(montoNumerico);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.montoMaximo || changes.montoMinimo) {
      this.formMonto.controls.monto.clearValidators();
      this.formMonto.controls.monto.setValidators(this.validarMonto(this.montoMaximo, this.montoMinimo));
    }

    if (changes.resetearMonto) {
      this.formMonto.controls.monto.setValue('');
    }
  }

  formatearConDecimales() {
    const value = this.formMonto.controls.monto.value.replace(/^0+/, '');
    this.formMonto.controls.monto.setValue(value.replace(/[^0-9,]/g, '').replace(/^(\d+,?\d{0,2})\d*$/, '$1'));
  }

  agregarSimboloYPuntos() {
    const value = this.formMonto.controls.monto.value;
    if (value) {
      const montoSeparado = value.split(',');
      const stringFinal = `$ ${montoSeparado[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${montoSeparado[1] || '00'}`;
      this.formMonto.controls.monto.setValue(stringFinal.trim());
    }
  }

  retirarSimboloYPuntos() {
    const value = this.formMonto.controls.monto.value;
    const stringFinal = value.replace(/[$.]+/g, '').replace(',00', '');
    this.formMonto.controls.monto.setValue(stringFinal.trim());
  }

  validarMonto(montoMaximo, montoMinimo) {
    return (control: AbstractControl) => {
      const monto = control.value.replace('$ ', '').replaceAll('.', '').replace(',', '.');
      const montoNumerico = parseFloat(monto);

      return (montoNumerico > montoMaximo || montoNumerico < montoMinimo) ? { montoInvalido: true } : null;
    };
  }

  get getValor() {
    return this.formMonto.controls.monto.value;
  }

  muestraErrores() {
    this.muestraMensaje = false;
    setTimeout(() => {
      this.muestraMensaje = true;
    }, 800);
  }
}
