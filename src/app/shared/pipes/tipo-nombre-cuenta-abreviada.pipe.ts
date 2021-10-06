import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoNombreCuentaAbreviada'
})
export class TipoNombreCuentaAbreviadaPipe implements PipeTransform {
  transform(tipoCuenta: string): string {
    let TipoNombreCuenta = '';

    switch (tipoCuenta) {
      case 'CA':
        TipoNombreCuenta = 'C.A.';
        break;
      case 'CC':
        TipoNombreCuenta = 'C.C.';
        break;
    }

    return TipoNombreCuenta;
  }
}
