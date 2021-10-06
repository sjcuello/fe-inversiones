import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'minuteSeconds'})
export class MinuteSecondsPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 0) {
      return '00:00';
    }
    const minutos: number = Math.floor(value / 60);
    const segundos: number = (value - minutos * 60);
    if (minutos < 10) {
      if (segundos < 10) {
        return '0' + minutos + ':' + '0' + segundos;
      } else {
        return '0' + minutos + ':' + segundos;
      }
    } else {
      if (segundos < 10) {
        return minutos + ':' + '0' + segundos;
      } else {
        return minutos + ':' + segundos;
      }
    }
  }
}
