import { ObtenerSiglaDestinatarioPipe } from './obtener-sigla-destinatario.pipe';

describe('ObtenerSiglaDestinatarioPipe', () => {

  const pipe = new ObtenerSiglaDestinatarioPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Debería devolver siglas de destintarios con primer nombre y último apellido', () => {
    expect(pipe.transform('Ricardo Taruel')).toEqual('RT');
    expect(pipe.transform('Mario Victor Taruel')).toEqual('MT');
    expect(pipe.transform('Jhony Lucas Cage')).toEqual('JC')
  });

  it('La sigla debe mostrarse en mayuscula', () => {
    expect(pipe.transform('ricardo taruel')).toEqual('RT');
  });

  it('Debería devolver "" Si no recibe destintarios', () => {
    expect(pipe.transform('')).toEqual('');
  });
});
