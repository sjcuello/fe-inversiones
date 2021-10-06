import { NumeroAMonedaPipe } from './numero-a-moneda.pipe';

describe('NumeroAMonedaPipe', () => {
  const pipe = new NumeroAMonedaPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Debería devolver el numero que ingresa con parametros en formato moneda', () => {
    const numero = 3000;
    expect(pipe.transform(numero)).toBe('$ 3.000,00');
  });

  it('Si envía null deberia devolver ""', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('Si envía 0 deberia devolver ""', () => {
    expect(pipe.transform(0)).toBe('');
  });
});
