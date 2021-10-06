import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'monedaANumero'})
export class MonedaANumeroPipe implements PipeTransform {

  transform(value: string): number {
    if (!value) { return; }
    return parseInt(('' + value).replace('.', '').replace('$ ', '').replace(',00', ''), 10);
  }

}
