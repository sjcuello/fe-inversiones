import { MinuteSecondsPipe } from './minute-Seconds.pipe';

describe('minuteSecondsPipe', () => {

  const pipe = new MinuteSecondsPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Debería transformar 100 segundos a 1 minuto 40 segundos', () => {
    expect(pipe.transform(100)).toBe('01:40');
  });

  it('Debería transformar 500 segundos a 8 minuto 20 segundos', () => {
    expect(pipe.transform(500)).toBe('08:20');
  });

  it('Debería transformar 5 segundos a 0 minuto 5 segundos', () => {
    expect(pipe.transform(5)).toBe('00:05');
  });

  it('En caso de ser 3 minutos debe mostrarse "03:00"', () => {
    expect(pipe.transform(180)).toBe('03:00');
  });

  it('En caso de que los segundos sean negativos, debe mostrarse "00:00"', () => {
    expect(pipe.transform(-5)).toBe('00:00');
  });

  it('En caso de ser más de 10 minutos, debe mostrarse "00:00"', () => {
    expect(pipe.transform(630)).toBe('10:30');
  });

});
