import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numberToAbs'})
export class NumberToAbsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return Math.abs(value);
  }

}
