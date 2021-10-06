import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { SettingsService } from '../../../core/services/settings.service';
import { TipoMoneda } from '../enums/moneda-enum';
import { Cotizacion } from '../models/cotizacion';
import { CuentasCliente } from '../models/cuenta';
import { obtenerBackendUrl, obtenerBackendUrlHome, obtenerHeaders } from './service-utils';
import { FriendFamily } from '../models/friends-family';
import { DetalleVentas } from '../models/detalle-ventas';
import { TenenciasDolarMep } from '../models/tenencias';
import { DetalleCompras } from '../models/detalle-compras';
import { Pais } from '../models/paises';
import { Ttcc } from '../models/ttcc';

@Injectable({
  providedIn: 'root'
})
export class InversionesService {
  private headers: HttpHeaders;
  private backendUrl: string;
  private backendUrlHome: string;

  constructor(private http: HttpClient, private setting: SettingsService, private authService: AuthService) {
    this.backendUrl = obtenerBackendUrl(this.setting);
    this.backendUrlHome = obtenerBackendUrlHome(this.setting);
    this.headers = obtenerHeaders(this.authService);
  }

  getCotizaciones(): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(`${this.backendUrl}/dolar-mep/cotizaciones`, {
      headers: this.headers
    });
  }

  calcularCotizacionDolarMep(cotizaciones: Cotizacion[]) {
    const cotizacionAL30 = this.obtenerCotizacion(cotizaciones, TipoMoneda.Pesos).puntas[0];
    const cotizacionAL30D = this.obtenerCotizacion(cotizaciones, TipoMoneda.Dolares).puntas[0];

    const precioCompra = cotizacionAL30.precio_venta / cotizacionAL30D.precio_compra;
    const precioVenta = cotizacionAL30.precio_compra / cotizacionAL30D.precio_venta;

    return { precioCompra, precioVenta };
  }

  obtenerCotizacion(cotizaciones: Cotizacion[], moneda: TipoMoneda) {
    return cotizaciones.find(c => c.codigo_moneda === moneda);
  }

  postCompraDolarMep(body: object): Observable<object> {
    return this.http.post<object>(`${this.backendUrl}/dolar-mep/compras`, body, {
      headers: this.headers
    });
  }

  getCuentas(): Observable<CuentasCliente> {
    return this.http.get<CuentasCliente>(`${this.backendUrl}/cuentas`, {
      headers: this.headers
    });
  }

  getTenenciasDolarMep(): Observable<TenenciasDolarMep> {
    return this.http.get<TenenciasDolarMep>(`${this.backendUrl}/dolar-mep/tenencias`, {
      headers: this.headers
    });
  }

  getDetalleVenta(): Observable<DetalleVentas> {
    return this.http.get<DetalleVentas>(`${this.backendUrl}/dolar-mep/detalle_venta`, {
      headers: this.headers
    });
  }

  getDetalleCompra(monto: number): Observable<DetalleCompras> {
    return this.http.get<DetalleCompras>(`${this.backendUrl}/dolar-mep/detalle_compra?inversion=${monto}`, {
      headers: this.headers
    });
  }

  postVentaDolarMep(body: object): Observable<object> {
    return this.http.post<object>(`${this.backendUrl}/dolar-mep/ventas`, body, {
      headers: this.headers
    });
  }

  validarFriendAndFamily(producto: string): Promise<FriendFamily> {
    return new Promise((resolve, reject) => {
      this.http.get<FriendFamily>(`${this.backendUrlHome}/friends-family?producto=${producto}`, {headers: this.headers}).subscribe(
        resp => {
          resolve(resp);
        }, error => reject()
      );
    });
  }

  getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.backendUrl}/catalogos/paises`, {
      headers: this.headers
    });
  }

  postOnboarding(body: object): Observable<object> {
    return this.http.post<object>(`${this.backendUrl}/dolar-mep/onboarding`, body, {
      headers: this.headers
    });
  }

  getTerminosCondiciones(termino: string): Observable<Ttcc> {
    return this.http.get<Ttcc>(`${this.backendUrl}/tycs/${termino}`, {
      headers: this.headers
    });
  }
}
