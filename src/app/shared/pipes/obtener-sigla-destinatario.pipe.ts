import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerSiglaDestinatario'
})
export class ObtenerSiglaDestinatarioPipe implements PipeTransform {

  transform(nombreYApellido: string): string {
    if (nombreYApellido === '') {
      return '';
    }
    const splitted = nombreYApellido.split(' ');
    const primerNombre = splitted[0];
    const ultimoApellido = splitted[splitted.length - 1];
    return (primerNombre[0] + ultimoApellido[0]).toUpperCase();
  }
}
