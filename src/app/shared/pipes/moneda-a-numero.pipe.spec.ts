import { MonedaANumeroPipe } from './moneda-a-numero.pipe';

describe('MonedaANumeroPipe', () => {

  const pipe = new MonedaANumeroPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Debería devolver el número entero de un número formateado a moneda', () => {
    expect(pipe.transform('$ 2.500,00')).toBe(2500);
  });

  it('Si envía "" deberia devolver', () => {
    expect(pipe.transform('')).toBe(undefined);
  });
});
