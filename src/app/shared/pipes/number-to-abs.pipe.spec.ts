import { NumberToAbsPipe } from './number-to-abs.pipe';

describe('NumberToAbsPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberToAbsPipe();
    expect(pipe).toBeTruthy();
  });

  it('devuelve el valor absoluto de un numero, cuando se le pasa como valor un numero positivo', () => {
    const pipe = new NumberToAbsPipe();
    expect(pipe.transform(1)).toBe(1);
  });

  it('devuelve el valor absoluto de un numero, cuando se le pasa como valor un numero negativo', () => {
    const pipe = new NumberToAbsPipe();
    expect(pipe.transform(-1)).toBe(1);
  });
});
