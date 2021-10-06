import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class InstanciaIconosService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  inicializaIconos(lista: string[]) {
    lista.forEach(item => {
      this.matIconRegistry.addSvgIcon(`${item}`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/icons/${item}.svg`)
      );
    });
  }
}
