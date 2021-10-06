import { TipoNombreCuentaAbreviadaPipe } from './tipo-nombre-cuenta-abreviada.pipe';

describe('TipoNombreCuentaAbreviadaPipe', () => {
  it('create an instance', () => {
    const pipe = new TipoNombreCuentaAbreviadaPipe();
    expect(pipe).toBeTruthy();
  });

  it('deberia devolver C.A. cuando el tipo de cuenta es Caja de Ahorro', () => {
    const pipe = new TipoNombreCuentaAbreviadaPipe();
    const tipoNombreCuenta = pipe.transform('CA');
    expect(tipoNombreCuenta === 'C.A.').toBeTruthy();
  });

  it('deberia devolver C.C. cuando el tipo de cuenta es Cuenta Corriente', () => {
    const pipe = new TipoNombreCuentaAbreviadaPipe();
    const tipoNombreCuenta = pipe.transform('CC');
    expect(tipoNombreCuenta === 'C.C.').toBeTruthy();
  });
});
