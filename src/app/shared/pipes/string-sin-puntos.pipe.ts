import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'stringSinPuntos'})
export class StringSinPuntosPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\./gi, '');
  }

}
