import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CONSTANTES } from '../../constants';

@Component({
  selector: 'ftya-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.scss']
})
export class InversionesComponent {

  textosHomeInversiones = CONSTANTES.PAGINA.HOME_INVERSIONES;
  textoPieCard = CONSTANTES.PAGINA.HOME_INVERSIONES.PIE_CARD;

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'caja-de-seguridad',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/caja-de-seguridad.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'cambio-moneda',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/cambio-moneda.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'dolar-mep',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/dolar-mep.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'fci',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/fci.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'plazo-fijo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/plazo-fijo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'titulos-acciones',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/titulos-acciones.svg')
    );
  }

  redirigir(sitio: string, producto: string) {
      if (sitio === 'obi') {
        window.location.href = `/obi/${producto}/`;
      } else {
        window.location.href = `/DefaultObi.aspx?mostrar=${producto}`;
      }
  }

}
