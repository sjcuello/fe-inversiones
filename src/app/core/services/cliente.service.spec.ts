import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ClienteService } from './cliente.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Cliente } from '../../shared/models/cliente';
import { SettingsService } from './settings.service';

describe('ClienteService', () => {
  let clienteService: ClienteService;
  let settingsService: SettingsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    clienteService = TestBed.inject(ClienteService);
    settingsService = TestBed.inject(SettingsService);
    httpMock = TestBed.inject(HttpTestingController);

    settingsService.settings = {
      backendUrl: 'http://localhost:5000/api/',
      jwtProviderUrl: 'http://localhost:4200/obi/assets/jwt.txt',
      googleTagManagerId: null,
      googleAnalyticsIds: ['UA-17782447-12'],
      idleSeconds: 0,
      idleTimeoutSeconds: 0,
      mostrarAccesosDirectos: false,
      logoffUrl: '',
      prestamosUrl: '',
      backendTarjetasUrl: '',
      cmsUrl: ''
    };
  });

  it('should be created', () => {
    expect(clienteService).toBeTruthy();
  });

  it('deberia hacer un get al endpoint de clientes para obtener los datos', fakeAsync((service: ClienteService) => {

    const clienteMock: Cliente = {
      apellido: 'Perez',
      nombre: 'Carlos',
      ultimo_login: new Date(),
      preferencias: { clave_por_vencer: true, vio_menu: false, vio_notificacion_clave: false },
      fecha_expiracion_clave: new Date(),
      email: '',
      tiene_activa_clave_sms: false,
      celular: ''
    };

    clienteService.getCliente();
    const req = httpMock.expectOne('http://localhost:5000/api/clientes?mobile=false');
    expect(req.request.url).toBe('http://localhost:5000/api/clientes?mobile=false');
    req.flush(clienteMock);
    httpMock.verify();
    tick();

  }));

  it('deberia hacer un patch al endpoint de clientes cuando se actualizan las preferencia del cliente', () => {
    const clienteMock: Cliente = {
      apellido: 'Perez',
      nombre: 'Carlos',
      ultimo_login: new Date(),
      preferencias: { clave_por_vencer: true, vio_menu: false, vio_notificacion_clave: false },
      fecha_expiracion_clave: new Date(),
      email: '',
      tiene_activa_clave_sms: false,
      celular: ''
    };

    clienteService.updatePreferencias(clienteMock.preferencias);

    const httpRequest = httpMock.expectOne('http://localhost:5000/api/clientes');
    expect(httpRequest.request.method).toBe('PATCH');
    httpRequest.flush({});
    httpMock.verify();
  });
});
