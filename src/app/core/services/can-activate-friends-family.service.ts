import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { InversionesService } from '../../modules/inversiones/services/inversiones.service';
import { CONSTANTES } from '../../modules/inversiones/constants';

@Injectable({
  providedIn: 'root'
})
export class CanActivateFriendsFamilyService implements CanActivate {

  producto = CONSTANTES.PAGINA.HOME_INVERSIONES.PRODUCTO.ID;

  constructor(private inversionesService: InversionesService ) {}

  canActivate() {
    return this.inversionesService.validarFriendAndFamily(this.producto).then(() => {
      return  true;
    }).catch(() => {
      window.location.href = '/DefaultObi.aspx?mostrar=inversiones';
      return false;
    });
  }
}
