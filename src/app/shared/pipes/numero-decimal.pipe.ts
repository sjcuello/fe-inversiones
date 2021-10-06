import {Pipe, PipeTransform} from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({name: 'numeroDecimal'})
export class NumeroDecimalPipe extends DecimalPipe implements  PipeTransform {

  transform(value: number): any {
    return super.transform(value, '1.2-2', 'es-AR');
  }
}
