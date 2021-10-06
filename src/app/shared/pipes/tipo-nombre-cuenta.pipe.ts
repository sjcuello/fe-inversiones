import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'tipoNombreCuenta'})
export class TipoNombreCuentaPipe implements PipeTransform {

  transform(tipoCuenta: string): string {
    let TipoNombreCuenta = '';

    switch (tipoCuenta) {
      case 'CA':
        TipoNombreCuenta = 'Caja de Ahorro';
        break;
      case 'CC':
        TipoNombreCuenta = 'Cuenta Corriente';
        break;
    }

    return TipoNombreCuenta;
  }
}
