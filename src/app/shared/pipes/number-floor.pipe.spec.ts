import { NumberFloorPipe } from './number-floor.pipe';

describe('NumberFloorPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberFloorPipe();
    expect(pipe).toBeTruthy();
  });

  it('devuelve el numero sin decimales sin redondear, cuando se le pasa como valor un numero', () => {
    const pipe = new NumberFloorPipe();

    expect(pipe.transform(1.9)).toBe(1);
    expect(pipe.transform(1.2222)).toBe(1);
  });

  it('Si le paso un entero debe devolver el mismo entero:', () => {
    const pipe = new NumberFloorPipe();
    expect(pipe.transform(1)).toBe(1);
    expect(pipe.transform(2)).toBe(2);
  });

  it('Si le paso un cero debe devolver 0', () => {
    const pipe = new NumberFloorPipe();
    expect(pipe.transform(0)).toBe(0);
  });

  it('Si le paso un cero debe devolver 0', () => {
    const pipe = new NumberFloorPipe();
    expect(pipe.transform(0.01)).toBe(0);
  });
});
