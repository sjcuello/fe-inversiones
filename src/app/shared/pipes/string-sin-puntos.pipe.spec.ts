import { StringSinPuntosPipe } from './string-sin-puntos.pipe';

describe('StringSinPuntosPipe', () => {
  it('create an instance', () => {
    const pipe = new StringSinPuntosPipe();
    expect(pipe).toBeTruthy();
  });

  it('deberia devolver el string sin puntos', () => {
    const numero = '12.312.314';
    const pipe = new StringSinPuntosPipe();
    expect(pipe.transform(numero)).toBe('12312314');
  });
});
