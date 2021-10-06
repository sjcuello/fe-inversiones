import { TipoNombreCuentaPipe } from './tipo-nombre-cuenta.pipe';

describe('TipoNombreCuentaPipe', () => {
  it('create an instance', () => {
    const pipe = new TipoNombreCuentaPipe();
    expect(pipe).toBeTruthy();
  });

  it('deberia devolver Caja de Ahorro cuando el tipo de cuenta es CA', () => {
    const pipe = new TipoNombreCuentaPipe();
    const tipoNombreCuenta = pipe.transform('CA');
    expect(tipoNombreCuenta === 'Caja de Ahorro').toBeTruthy();
  });

  it('deberia devolver Cuenta Corriente cuando el tipo de cuenta es CC', () => {
    const pipe = new TipoNombreCuentaPipe();
    const tipoNombreCuenta = pipe.transform('CC');
    expect(tipoNombreCuenta === 'Cuenta Corriente').toBeTruthy();
  });
});
