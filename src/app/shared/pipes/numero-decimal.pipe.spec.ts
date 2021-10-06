import { NumeroDecimalPipe } from './numero-decimal.pipe';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr, 'es-Ar');

describe('NumeroDecimalPipe', () => {
  it('create an instance', () => {
    const pipe = new NumeroDecimalPipe('es-AR');
    expect(pipe).toBeTruthy();
  });

  it('Deberia devolver correctamente el numero si no tiene decimales', () => {
    const saldo = 100000;
    const pipe = new NumeroDecimalPipe('es-AR');
    const resultado = pipe.transform(saldo);
    expect(resultado).toBe('100.000,00');
  });

  it('Deberia devolver correctamente el numero si contiene mas de dos decimales', () => {
    const saldo = 100000.120;
    const pipe = new NumeroDecimalPipe('es-AR');
    const resultado = pipe.transform(saldo);
    expect(resultado).toBe('100.000,12');
  });

  it('Deberia devolver correctamente el numero 0,00', () => {
    const saldo = 10;
    const pipe = new NumeroDecimalPipe('es-AR');
    const resultado = pipe.transform(saldo);
    expect(resultado).toBe('10,00');
  });

  it('Deberia devolver correctamente el numero 0,00', () => {
    const saldo = 0;
    const pipe = new NumeroDecimalPipe('es-AR');
    const resultado = pipe.transform(saldo);
    expect(resultado).toBe('0,00');
  });

  it('Deberia devolver correctamente el numero 0,00', () => {
    const saldo = 0.01;
    const pipe = new NumeroDecimalPipe('es-AR');
    const resultado = pipe.transform(saldo);
    expect(resultado).toBe('0,01');
  });

  it('Deberia devolver correctamente el numero 0,00', () => {
    const saldo = 0.0;
    const pipe = new NumeroDecimalPipe('es-AR');
    const resultado = pipe.transform(saldo);
    expect(resultado).toBe('0,00');
  });
});
