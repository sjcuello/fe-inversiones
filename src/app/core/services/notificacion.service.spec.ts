import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { of } from 'rxjs';
import { Cliente, Preferencias } from '../../shared/models/cliente';
import { Notificacion, NotificacionesResponse } from '../../shared/models/notificacion';
import { ClienteService } from './cliente.service';
import { NotificacionService } from './notificacion.service';
import { SettingsService } from './settings.service';


function setVioNotificacionClave(bool: string) {
  sessionStorage.setItem('vio_notificacion_clave', bool);
}

describe('NotificacionService', () => {
  let service: NotificacionService;
  let mockClienteService;
  let mockCliente: Cliente;
  let mockPreferencias: Preferencias;
  let mockNotificacionesResponse: NotificacionesResponse;
  const settingsServiceMock = {
    settings: {
      backendUrl: 'http://localhost:5000/api/',
      backendTarjetasUrl: 'http://localhost:5000/tarjetas/api/',
    }
  };

  beforeEach(() => {

    mockClienteService = {
      getcliente$: jest.fn(),
      updateVioNotificacionClave: jest.fn()
    };

    mockPreferencias = {
      clave_por_vencer: true, vio_menu: true, vio_notificacion_clave: false
    };

    mockCliente = {
      nombre: 'Nombre de usuario',
      apellido: 'Apellido de usuario',
      ultimo_login: new Date(),
      preferencias: mockPreferencias,
      fecha_expiracion_clave: moment('2020-05-10').toDate()
    };

    mockClienteService.getcliente$.mockReturnValue(of(mockCliente));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ClienteService,
        { provide: ClienteService, useValue: mockClienteService },
        { provide: SettingsService, useValue: settingsServiceMock }
      ]
    });
    service = TestBed.inject(NotificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia generar una notificacion si el cliente tiene la clave por vencer', async(() => {
    mockCliente.preferencias.clave_por_vencer = true;
    service.generarNotificacionClavePorVencer(mockCliente);

    service.getNotificaciones$().subscribe( result => {
      expect(result.length).toBeTruthy();
    });
  }));

  it('deberia generar una notificacion si el cliente tiene la clave por vencer, con le??do en false', async(() => {
    setVioNotificacionClave('false');
    mockCliente.preferencias.clave_por_vencer = true;
    const notificacion = service.generarNotificacionClavePorVencer(mockCliente);

    expect(notificacion.leido).toBe(false);
  }));

  it('deberia generar una notificacion si el cliente tiene la clave por vencer, con le??do en true', async(() => {
    setVioNotificacionClave('true');
    mockCliente.preferencias.clave_por_vencer = true;
    const notificacion = service.generarNotificacionClavePorVencer(mockCliente);

    expect(notificacion.leido).toBe(true);
  }));

  it('deberia generar un mensaje correcto cuando la clave del cliente vence en el dia de la fecha', () => {
    const hoy = moment('2020-05-10');
    // @ts-ignore
    const descripcion = service.obtenerDescripcionVencimientoClave(mockCliente, hoy);
    expect(descripcion).toBe('Tu clave de acceso vence hoy. Si quer??s cambiarla ahora, ingres?? a Cambio de Clave.');
  });

  it('deberia generar un mensaje correcto cuando la clave del cliente tiene vencimiento no en el dia de la fecha', () => {
    const ndias = moment('2020-05-05');
    // @ts-ignore
    const descripcion = service.obtenerDescripcionVencimientoClave(mockCliente, ndias);

    expect(descripcion).toBe('Tu clave de acceso vencer?? en 5 d??as. Si quer??s cambiarla ahora, ingres?? a Cambio de Clave.');
  });

  it('deberia generar un mensaje correcto cuando la clave del cliente tiene vencimiento en un dia', () => {
    const ndias = moment.utc('2020-05-09');
    // @ts-ignore
    const descripcion = service.obtenerDescripcionVencimientoClave(mockCliente, ndias);
    expect(descripcion).toBe('Tu clave de acceso vencer?? en 1 d??a. Si quer??s cambiarla ahora, ingres?? a Cambio de Clave.');
  });

  it('deber??a invocar al servicio de notificaciones y pushearlas a lista_notificaciones', () => {
    const mockListaNotificaciones: Notificacion[] = [
      {
        nombre: 'Titulo de notificaci??n',
        descripcion: 'Descripci??n de notificaci??n',
        link_call_to_action: {
          descripcion: 'Descripci??n de Link',
          href: '/link'
        },
        leido: false
      }
    ];
    const mockNotificacionesNoLeidasCount: number = 1;

    mockNotificacionesResponse = {
      no_leidas: mockNotificacionesNoLeidasCount,
      lista_notificaciones: mockListaNotificaciones
    };

    // @ts-ignore
    jest.spyOn(service, 'getNotificacionesResponse')
      .mockImplementation(() => of(mockNotificacionesResponse));
    jest.spyOn(service, 'updateNotificacionesNoLeidasCount');
    jest.spyOn(service, 'pushNotificaciones');

    service.inicializarNotificaciones();

    // @ts-ignore
    expect(service.getNotificacionesResponse).toHaveBeenCalledTimes(1);
    expect(service.pushNotificaciones).toHaveBeenCalledWith(mockListaNotificaciones);
    expect(service.updateNotificacionesNoLeidasCount).toHaveBeenCalledWith(mockNotificacionesNoLeidasCount);
  });

  it('deber??a actualizar las notificaciones en el servicio cuando se invoca el m??todo pushNotificacion', () => {
    const nuevaNotificacion = [{
        nombre: 'Titulo de notificaci??n',
        descripcion: 'Descripci??n de notificaci??n',
        link_call_to_action: {
          descripcion: 'Descripci??n de Link',
          href: '/link'
        },
        leido: false
      }];

    const expectedResult = [
      {
        nombre: 'Tu clave de acceso a Online Banking est?? pr??xima a vencer',
        descripcion: 'Tu clave de acceso vence hoy. Si quer??s cambiarla ahora, ingres?? a Cambio de Clave.',
        link_call_to_action: {
          descripcion: 'Cambio de Clave',
          href: '/DefaultObi.aspx?mostrar=misdatos-seguridad'
        },
        leido: false
      },
      {
        nombre: 'Titulo de notificaci??n',
        descripcion: 'Descripci??n de notificaci??n',
        link_call_to_action: { descripcion: 'Descripci??n de Link', href: '/link' },
        leido: false
      }
    ];

    service.pushNotificaciones(nuevaNotificacion);
    const result = service.notificaciones;

    expect(result).toEqual(expectedResult);
  });

  it('deber??a actualizar el n??mero de notificaciones \'no leidas\' cuando se invoca el m??todo updateNotificacionesNoLeidasCount', () => {
    service.updateNotificacionesNoLeidasCount(1);

    const result = service.notificacionesNoLeidasCount;

    expect(result).toEqual(2);
  });

  it('deber??a actualizar el contador de notificiones no leidas y marcarlas a todas como leidas cuando se invoca el m??todo updateNotificacionesComoLeidas', () => {
    const nuevaNotificacion = [{
      nombre: 'Titulo de notificaci??n',
      descripcion: 'Descripci??n de notificaci??n',
      link_call_to_action: {
        descripcion: 'Descripci??n de Link',
        href: '/link'
      },
      leido: false
    }];

    const expectedResult = [
      {
        nombre: 'Tu clave de acceso a Online Banking est?? pr??xima a vencer',
        descripcion: 'Tu clave de acceso vence hoy. Si quer??s cambiarla ahora, ingres?? a Cambio de Clave.',
        link_call_to_action: {
          descripcion: 'Cambio de Clave',
          href: '/DefaultObi.aspx?mostrar=misdatos-seguridad'
        },
        leido: true
      },
      {
        nombre: 'Titulo de notificaci??n',
        descripcion: 'Descripci??n de notificaci??n',
        link_call_to_action: { descripcion: 'Descripci??n de Link', href: '/link' },
        leido: true
      }
    ];
    jest.spyOn(service, 'postNotificacionesComoLeidas');

    service.updateNotificaciones(nuevaNotificacion);

    expect(service.notificacionesNoLeidasCount).toBe(2);

    service.updateNotificacionesComoLeidas();

    expect(service.postNotificacionesComoLeidas).toHaveBeenCalledTimes(1);
    expect(service.notificacionesNoLeidasCount).toBe(0);
    expect(service.notificaciones).toEqual(expectedResult);
  });

  it('deber??a actualizar el contador de notificaciones no leidas cuando se llama el m??todo updateNotificaciones', () => {
    const nuevasNotificaciones = [
      {
        nombre: 'Titulo de notificaci??n',
        descripcion: 'Descripci??n de notificaci??n',
        link_call_to_action: {
          descripcion: 'Descripci??n de Link',
          href: '/link'
        },
        leido: true
      },
      {
        nombre: 'Titulo de notificaci??n',
        descripcion: 'Descripci??n de notificaci??n',
        link_call_to_action: {
          descripcion: 'Descripci??n de Link',
          href: '/link'
        },
        leido: false
      },
      {
        nombre: 'Titulo de notificaci??n',
        descripcion: 'Descripci??n de notificaci??n',
        link_call_to_action: {
          descripcion: 'Descripci??n de Link',
          href: '/link'
        },
        leido: true
      }
    ];

    jest.spyOn(service, 'postNotificacionesComoLeidas');

    service.updateNotificaciones(nuevasNotificaciones);
    expect(service.postNotificacionesComoLeidas).toHaveBeenCalledTimes(0);
    expect(service.notificacionesNoLeidasCount).toBe(2);
  });

  afterEach(() => {
    sessionStorage.clear();
  });
});
