import { NumeroSinDecimalPipe } from './numero-sin-decimal.pipe';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr, 'es-Ar');

describe('NumeroSinDecimalPipe', () => {
  it('Se crea una instancia', () => {
    const pipe = new NumeroSinDecimalPipe('es-AR');
    expect(pipe).toBeTruthy();
  });

  it('Debería devolver correctamente el número si no tiene decimales', () => {
    const saldo = 10000000;
    const pipe = new NumeroSinDecimalPipe('es-AR');
    const resultado = pipe.transform(saldo);
    expect(resultado).toBe('10.000.000');
  });

  it('Debería devolver correctamente el número si contiene mas de dos decimales', () => {
    const saldo = 100000;
    const pipe = new NumeroSinDecimalPipe('es-AR');
    const resultado = pipe.transform(saldo);
    expect(resultado).toBe('100.000');
  });

  it('Debería devolver correctamente el número 10', () => {
    const saldo = 10;
    const pipe = new NumeroSinDecimalPipe('es-AR');
    const resultado = pipe.transform(saldo);
    expect(resultado).toBe('10');
  });

  it('Debería devolver correctamente el número 0', () => {
    const saldo = 0.01;
    const pipe = new NumeroSinDecimalPipe('es-AR');
    const resultado = pipe.transform(saldo);
    expect(resultado).toBe('0');
  });

  it('Debería devolver correctamente el número 0', () => {
    const saldo = 0.0;
    const pipe = new NumeroSinDecimalPipe('es-AR');
    const resultado = pipe.transform(saldo);
    expect(resultado).toBe('0');
  });
});
