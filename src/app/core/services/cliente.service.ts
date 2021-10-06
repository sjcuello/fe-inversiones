import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { Cliente, Preferencias } from '../../shared/models/cliente';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteSubject = new BehaviorSubject<Cliente>(null);
  constructor(private http: HttpClient, private settingsService: SettingsService) {}

  getCliente(): Promise<Cliente> {
    const media: boolean = window.matchMedia('only screen and (max-width: 768px)').matches;
    return new Promise((resolve, reject) => {
      this.http.get<Cliente>(this.settingsService.settings.backendUrl + 'clientes' + '?mobile=' + media).subscribe(
        response => {
          this.procesarCambiosEnEntidadCliente(response);
          resolve(response);
        }, error => reject()
      );
    });
  }

  updatePreferencias(preferencias: Preferencias): void {
    this.http.patch(this.settingsService.settings.backendUrl + 'clientes', preferencias).
      subscribe(() => {
        const cliente: Cliente = JSON.parse(sessionStorage.getItem('cliente'));
        cliente.preferencias = preferencias;
        this.procesarCambiosEnEntidadCliente(cliente);
      }
    );
  }

  updateVioNotificacionClave(value: boolean) {
    const clienteActual = this.clienteSubject.getValue();

    if (clienteActual.preferencias.vio_notificacion_clave !== value) {
        clienteActual.preferencias.vio_notificacion_clave = value;
        this.procesarCambiosEnEntidadCliente(clienteActual);
    }
  }

  procesarCambiosEnEntidadCliente(cliente: Cliente) {
    sessionStorage.setItem('cliente', JSON.stringify(cliente));
    this.emitirActualizacionDatosCliente(cliente);
  }

  getcliente$(): Observable<Cliente> {
    return this.clienteSubject.asObservable().pipe(
      filter(c => !!c)
    );
  }

  emitirActualizacionDatosCliente(cliente: Cliente) {
    this.clienteSubject.next(cliente);
  }

  getClienteFromStorage() {
    const cliente: Cliente = JSON.parse(sessionStorage.getItem('cliente'));
    this.emitirActualizacionDatosCliente(cliente);
  }
}
