import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SettingsService } from 'src/app/core/services/settings.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movimiento } from '../../shared/models/movimiento';
import { CuentasPosicion } from '../../shared/models/cuentas-posicion';
import { map, tap } from 'rxjs/operators';
import { Cuenta } from '../../shared/models/cuenta';
import { CuentasCliente } from 'src/app/modules/inversiones/models/cuenta';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http: HttpClient, private settingsService: SettingsService, private authService: AuthService) {
  }

  private esCuentaNegocioSubject = new BehaviorSubject<boolean>(false);

  getEsCuentaNegocio$(): Observable<boolean> {
    return this.esCuentaNegocioSubject.asObservable();
  }

  private emitirActualizacionEsCuentaNegocio(esCuentaNegocio: boolean) {
    this.esCuentaNegocioSubject.next(esCuentaNegocio);
  }

  getTotalesCuentas(): Observable<CuentasPosicion> {
    return this.getCuentas().pipe(
      tap(
        posicion => {
          this.emitirActualizacionEsCuentaNegocio(posicion.es_cliente_empresa);
        }));
  }

  getCuentas(): Observable<CuentasPosicion> {
    return this.http.get<CuentasPosicion>(this.settingsService.settings.backendUrl + 'cuentas');
  }

  getCuentaPredeterminada(): Observable<Cuenta> {
    return this.getCuentas().pipe(
      tap(
        posicion => {
          this.emitirActualizacionEsCuentaNegocio(posicion.es_cliente_empresa);
        }
      ),
      map(response => {
        if (response.cuenta_predeterminada === '') {
          return;
        }
        return response.cuentas.find((cuenta: Cuenta) => {
          return cuenta.identificador === response.cuenta_predeterminada;
        });
      })
    );
  }

  getMovimientos(idCuenta: string): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.settingsService.settings.backendUrl + 'cuentas/' + idCuenta + '/movimientos');
  }

  getEsClienteEmpresaInversiones(): Observable<CuentasCliente> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
    return this.http.get<CuentasCliente>(`${this.settingsService.settings.backendUrlInversiones}v1.0/cuentas`, { headers })
      .pipe(
        tap(
          cuentasCliente => this.emitirActualizacionEsCuentaNegocio(cuentasCliente.es_cliente_empresa)
        )
      );
  }
}
