import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numeroAMoneda'})
export class NumeroAMonedaPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) {
      return '';
    }
    return ('$ ' + ('' + value).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',00');
  }

}
