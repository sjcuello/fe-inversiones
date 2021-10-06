import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { Settings } from '../settings';
import { AuthService } from './auth.service';
import { ClienteService } from './cliente.service';
import { HabilitacionService } from './habilitacion.service';
import { CuentaService } from './cuenta.service';

@Injectable({ providedIn: 'root' })

export class SettingsHttpService {

  constructor(private http: HttpClient,
              private settingsService: SettingsService,
              private authService: AuthService,
              private clienteService: ClienteService,
              private habilitacionService: HabilitacionService,
              private cuentaService: CuentaService) {
  }

  initializeApp(): Promise<void> {
    return new Promise(
      (resolve) => {
        this.http.get('assets/environment-specific-settings/settings.json')
          .toPromise()
          .then(response => {
              this.settingsService.settings = response as Settings;
              this.authService.initCicloAuth().toPromise().then(() => {
                this.clienteService.getClienteFromStorage();
                this.habilitacionService.iniciarEmisorHabilitacion();
                this.cuentaService.getEsClienteEmpresaInversiones().subscribe();
                resolve();
              })
              .catch(this.manejarErrorCritico);
            })
          .catch(this.manejarErrorCritico);
      }
    );
  }

  manejarErrorCritico(error) {
    /*Se redirige a HBI*/
    window.location.href = '/';
  }
}
