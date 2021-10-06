import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CuentaService } from './cuenta.service';
import { Cuenta, CuentaEstado } from '../../shared/models/cuenta';
import { Movimiento, TipoMovimiento } from '../../shared/models/movimiento';
import { CuentasPosicion } from '../../shared/models/cuentas-posicion';
import { SettingsService } from './settings.service';
import { AuthService } from './auth.service';

const mockAuthService = {
  getToken: jest.fn()
};

describe('CuentaService', () => {
  let cuentaService: CuentaService;
  let httpMock: HttpTestingController;
  const settingsServiceMock = {
    settings: {
      backendUrl: 'http://localhost:5000/api/'
    }
  };

  const cuentasMock: CuentasPosicion = {
    cuenta_predeterminada: '',
    cuentas: [],
    saldos: [],
    es_cliente_empresa: true,
  };

  cuentasMock.cuenta_predeterminada = '100-3553105-10';

  cuentasMock.cuentas = [
    {
      tipo_cuenta: 'CA',
      moneda: { simbolo: '$', descripcion: '' },
      numero: '100-3553105-3',
      saldo: 30000,
      estado: CuentaEstado.normal,
      identificador: '1-21-80-0-1-0-36-54269-2',
      codigo_paquete: 0,
    },
    {
      tipo_cuenta: 'CA',
      moneda: { simbolo: 'u$s', descripcion: '' },
      numero: '100-3553105-10',
      saldo: 50000,
      estado: CuentaEstado.normal,
      identificador: '1-21-80-0-1-0-36-54269-2',
      codigo_paquete: 0,
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CuentaService,
        { provide: SettingsService, useValue: settingsServiceMock },
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
    cuentaService = TestBed.inject(CuentaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(cuentaService).toBeTruthy();
  });

  it('deberia hacer la llamada http al servicio de cuentas', () => {

    cuentasMock.saldos = [
      {
        monto: 30000,
        moneda: { simbolo: '$', descripcion: '' },
      },

      {
        monto: 50000,
        moneda: { simbolo: 'u$s', descripcion: '' },
      },
    ];

    cuentaService.getTotalesCuentas().subscribe((cuentasResponse: CuentasPosicion) => {
      expect(cuentasResponse.cuentas.length).toBe(2);
      expect(cuentasResponse).toEqual(cuentasMock);
    });

    const httpRequest = httpMock.expectOne('http://localhost:5000/api/cuentas');
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(cuentasMock);
    httpMock.verify();
  });

  it('deberia hacer la llamada http al servicio de movimientos', () => {

    let movimientosMock: Movimiento[];
    const identificadorMock = '1-21-80-0-1-0-36-54269-2';

    movimientosMock = [
      {
        fecha: '2020/05/25',
        descripcion: 'Plazo fijo',
        importe: 1000,
        tipo_movimiento: TipoMovimiento.credito
      },
      {
        fecha: '2020/05/25',
        descripcion: 'Nike',
        importe: 1000,
        tipo_movimiento: TipoMovimiento.debito
      }
    ];

    cuentaService.getMovimientos(identificadorMock).subscribe((movimientosResponse: Movimiento[]) => {
      expect(movimientosResponse.length).toBe(2);
      expect(movimientosResponse).toEqual(movimientosMock);
    });

    const httpRequest = httpMock.expectOne('http://localhost:5000/api/cuentas/' + identificadorMock + '/movimientos');
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(movimientosMock);
    httpMock.verify();
  });

  it('Debería obtener la cuenta predeterminada', () => {
    const c = cuentaService.getCuentaPredeterminada().subscribe((cuenta: Cuenta) => {
      expect(cuenta).toBe(cuentasMock[1]);
    });

    const httpRequest = httpMock.expectOne('http://localhost:5000/api/cuentas');
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(cuentasMock);
    httpMock.verify();
  });
});
