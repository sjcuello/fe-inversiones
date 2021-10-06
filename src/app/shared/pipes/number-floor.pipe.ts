import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberFloor' })
export class NumberFloorPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): number {
    return Math.floor(value);
  }
}
