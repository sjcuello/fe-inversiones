import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SettingsService} from './settings.service';
import {JwtModule} from '@auth0/angular-jwt';
import { Cliente } from '../../shared/models/cliente';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

describe('AuthService', () => {
  let service: AuthService;
  let settingsService: SettingsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter,
            whitelistedDomains: [
              'localhost:5000',
            ],
          }
        })
      ]
    });

    sessionStorage.clear();

    service = TestBed.inject(AuthService);
    settingsService = TestBed.inject(SettingsService);
    httpMock = TestBed.inject(HttpTestingController);

    settingsService.settings = {
      backendUrl: null,
      jwtProviderUrl: 'http://localhost:4200/obi/assets/jwt.txt',
      googleTagManagerId: null,
      googleAnalyticsIds: ['UA-17782447-12'],
      idleSeconds: 0,
      idleTimeoutSeconds: 0,
      mostrarAccesosDirectos: false,
      logoffUrl: 'https://www.supervielle.com.ar/log-off',
      prestamosUrl: '',
      cmsUrl: '',
      backendTarjetasUrl: '',
    };
  });

  beforeAll(() => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: ''
      }
    });
  });

  afterAll(() => {
    delete global.window.location;
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería traer token de servidor y almacenarlo en una key en el session storage', () => {
    // tslint:disable-next-line: max-line-length
    const serverToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwZXJzb25hcy5zdXBlcnZpZWxsZS5jb20uYXIiLCJpYXQiOjE1ODIxMTgwMDEsImV4cCI6MTU4OTgwNzYwMSwiYXVkIjoicGVyc29uYXMuc3VwZXJ2aWVsbGUuY29tLmFyL29iaSIsInN1YiI6IjA4MDA0MTAyMDMwNjcifQ.lDCNQCIaBcUKXMMgyOEWFsOL9B2y0kI5d03lS2jQKLE';

    service.initCicloAuth().subscribe((response) => {

      const fetchedToken: string = sessionStorage.getItem('token');

      expect(fetchedToken).toBe(serverToken);
      expect(response).toBe(serverToken);
    });

    const httpRequest = httpMock.expectOne('http://localhost:4200/obi/assets/jwt.txt');
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(serverToken);
    httpMock.verify();
  });

  it('debería devolver el token almacenado en el session storage', () => {
    // tslint:disable-next-line: max-line-length
    const storedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwZXJzb25hcy5zdXBlcnZpZWxsZS5jb20uYXIiLCJpYXQiOjE1ODIxMTgwMDEsImV4cCI6MTU4OTgwNzYwMSwiYXVkIjoicGVyc29uYXMuc3VwZXJ2aWVsbGUuY29tLmFyL29iaSIsInN1YiI6IjA4MDA0MTAyMDMwNjcifQ.lDCNQCIaBcUKXMMgyOEWFsOL9B2y0kI5d03lS2jQKLE';
    sessionStorage.setItem('token', storedToken);
    const fetchedToken = service.getToken();

    expect(fetchedToken).toBe(storedToken);
  });

  it('debería redirigir al CloseSesion de HBI si el cliente tiene que responder la encuesta', () => {
    const clienteMock: Cliente = {
      apellido: 'Perez',
      nombre: 'Carlos',
      ultimo_login: new Date(),
      preferencias: { clave_por_vencer: true, vio_menu: false, vio_notificacion_clave: false },
      fecha_expiracion_clave: new Date(),
      mostrar_encuesta : true,
      email: '',
      cuil:'20134987655',
      club_beneficio_id: null,
      tiene_activa_clave_sms: false,
      celular: ''
    };
    sessionStorage.setItem('cliente', JSON.stringify(clienteMock));
    service.salir(true);
    expect(window.location.href).toBe('/CloseSession/CloseSession.aspx');
  });

  it('deberia redirigir al Logout de HBI si el cliente no tiene que responder la encuesta', () => {
    const clienteMock: Cliente = {
      apellido: 'Perez',
      nombre: 'Carlos',
      ultimo_login: new Date(),
      preferencias: { clave_por_vencer: true, vio_menu: false, vio_notificacion_clave: false },
      fecha_expiracion_clave: new Date(),
      mostrar_encuesta: false,
      cuil:'20134987655',
      email: null,
      tiene_activa_clave_sms: false,
      celular: ''
    };
    sessionStorage.setItem('cliente', JSON.stringify(clienteMock));
    service.salir(true);
    expect(window.location.href).toBe(settingsService.settings.logoffUrl);
  });

  it('no deberia mostrar la encuesta si la sesion se cierra por vencimiento de inactividad del usuario', () => {
    window.location.href = '/obi';
    const clienteMock: Cliente = {
      apellido: 'Perez',
      nombre: 'Carlos',
      ultimo_login: new Date(),
      preferencias: { clave_por_vencer: true, vio_menu: false, vio_notificacion_clave: false },
      fecha_expiracion_clave: new Date(),
      mostrar_encuesta: true,
      email: null,
      cuil:'20134987655',
      tiene_activa_clave_sms: false,
      celular: ''
    };
    sessionStorage.setItem('cliente', JSON.stringify(clienteMock));
    service.salir();
    expect(window.location.href).toBe('/obi');
  });
});
