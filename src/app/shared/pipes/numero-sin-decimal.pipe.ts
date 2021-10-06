import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({ name: 'numeroSinDecimal' })
export class NumeroSinDecimalPipe extends DecimalPipe implements PipeTransform {

  transform(value: number): any {
    return super.transform(value, '1.0-0', 'es-AR');
  }
}
