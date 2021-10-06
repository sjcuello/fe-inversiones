import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from '../../../core/services/auth.service';
import { InversionesService } from './inversiones.service';
import { Cotizacion } from '../models/cotizacion';
import { CuentasCliente } from '../models/cuenta';
import { TenenciasDolarMep } from '../models/tenencias';
import { DetalleVentas } from '../models/detalle-ventas';
import { DetalleCompras } from '../models/detalle-compras';
import { Pais } from '../models/paises';
import { Ttcc } from '../models/ttcc';

const mockAuthService = {
  getToken: jest.fn()
};

describe('InversionesService', () => {
  let service: InversionesService;
  let httpMock: HttpTestingController;
  let mockRespuestaCotizaciones: Cotizacion[];
  let mockRespuestaTenenciasDolarMep: TenenciasDolarMep;
  let mockRespuestaDetalleVentas: DetalleVentas;
  let mockRespuestaDetalleCompras: DetalleCompras;
  let mockPaises: Pais[];
  let mockTtcc: Ttcc;

  beforeEach(() => {
    mockRespuestaCotizaciones = [
      {
        volumen_nominal: 100,
        codigo_moneda: 80,
        puntas: [
          {
            precio_compra: 5812,
            precio_venta: 5813
          }
        ]
      },
      {
        volumen_nominal: 100,
        codigo_moneda: 2,
        puntas: [
          {
            precio_compra: 6,
            precio_venta: 6.7
          }
        ]
      }
    ];

    mockRespuestaTenenciasDolarMep = {
      parking: {
        simbolo: 'AL30',
        cantidad_nominales: 6,
        monto: {
          moneda: {
            codigo: 2,
            simbolo: 'u$s',
            descripcion: 'Dólares'
          },
          monto: 205.620
        }
      },
      disponible: {
        simbolo: 'AL30',
        cantidad_nominales: 4,
        monto: {
          moneda: {
            codigo: 2,
            simbolo: 'u$s',
            descripcion: 'Dólares'
          },
          monto: 137.080
        }
      }
    };

    mockRespuestaDetalleVentas = {
      cantidad_nominales_disponibles: 1550,
      porcentaje_comision_venta: 0.5,
      porcentaje_derechos_mercado: 0.01,
      estimados: {
        venta: {
          moneda: {
            codigo: 2,
            simbolo: 'u$s',
            descripcion: 'Dólares'
          },
          monto: 13998.43
        },
        comision_venta: {
          moneda: {
            codigo: 2,
            simbolo: 'u$s',
            descripcion: 'Dólares'
          },
          monto: 69.992
        },
        credito: {
          moneda: {
            codigo: 2,
            simbolo: 'u$s',
            descripcion: 'Dólares'
          },
          monto: 13928.438
        },
        derechos_mercado: {
          moneda: {
            codigo: 80,
            simbolo: '$',
            descripcion: 'Pesos'
          },
          monto: 147.305479
        }
      }
    };

    mockRespuestaDetalleCompras = {
      inversion: {
        moneda: {
          codigo: 80,
          simbolo: '$',
          descripcion: 'Pesos'
        },
        monto: 1345.47
      },
      porcentaje_comision_compra: 0.5,
      porcentaje_derechos_mercado: 0.01,
      comision_compra: {
        moneda: {
          codigo: 80,
          simbolo: '$',
          descripcion: 'Pesos'
        },
        monto: 1345.47
      },
      derechos_mercado: {
        moneda: {
          codigo: 80,
          simbolo: '$',
          descripcion: 'Pesos'
        },
        monto: 1345.47
      },
      cotizacion_dolar_mep: {
        moneda: {
          codigo: 80,
          simbolo: '$',
          descripcion: 'Pesos'
        },
        monto: 1345.47
      },
      compra_estimada: {
        moneda: {
          codigo: 80,
          simbolo: '$',
          descripcion: 'Pesos'
        },
        monto: 1345.47
      },
      dinero_operacion: {
        moneda: {
          codigo: 80,
          simbolo: '$',
          descripcion: 'Pesos'
        },
        monto: 11938.8
      }
    };

    mockPaises = [
      {
        "codigo": 0,
        "nombre": "Argentina"
      },
      {
        "codigo": 1,
        "nombre": "Uruguay"
      },
      {
        "codigo": 2,
        "nombre": "Chile"
      },
      {
        "codigo": 3,
        "nombre": "Bolivia"
      }
    ];

    mockTtcc = {
      "id": "60a8451-a29c-41d4-a716-79a8451",
      "texto": "string"
    }


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
    service = TestBed.inject(InversionesService);
    (service as any).backendUrl = 'http://localhost:3000/obi/inversiones/api/v1.0';
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debe obtener la cotización de los bonos cuando se llama a getCotizaciones()', () => {
    let cotizaciones;
    service.getCotizaciones().subscribe((c) => cotizaciones = c);

    const req = httpMock.expectOne('http://localhost:3000/obi/inversiones/api/v1.0/dolar-mep/cotizaciones');
    req.flush(mockRespuestaCotizaciones);

    expect(req.request.method).toBe('GET');
    expect(req.request.headers).toEqual((service as any).headers);
    expect(cotizaciones.length).toBe(2);
    expect(cotizaciones).toEqual(mockRespuestaCotizaciones);
  });

  it('Debe calcular el precio de compra y el precio de venta del Dólar Mep', () => {
    const cotizacionDolarMep = service.calcularCotizacionDolarMep(mockRespuestaCotizaciones);

    expect(cotizacionDolarMep.precioCompra).toBe(968.8333333333334);
    expect(cotizacionDolarMep.precioVenta).toBe(867.4626865671642);
  });

  it('Debe generar una solicitud de compra cuando se llama a postCompraDolarMep()', () => {
    let compra;
    const mockRespuestaCompras = {
      numero_operacion: 123
    };

    const body = { monto: 15000, identificador_cuenta_origen: '1-20-80-0-1-0-5-8827-1' };

    service.postCompraDolarMep(body).subscribe((c) => compra = c);

    const req = httpMock.expectOne('http://localhost:3000/obi/inversiones/api/v1.0/dolar-mep/compras');
    req.flush(mockRespuestaCompras);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(body);
    expect(req.request.headers).toEqual((service as any).headers);
    expect(compra).toEqual(mockRespuestaCompras);
  });

  it('Debe obtener las cuentas del cliente cuando se llama a getCuentas()', () => {
    let cuentas;

    const mockRespuestaCuentas: CuentasCliente = {
      cuenta_predeterminada: '02110000800000000195678000000000002002',
      cuentas: [
        {
          identificador: '02110000800000000195678000000000002002',
          tipo_cuenta: 'CA',
          saldo: 9999999010624.52,
          numero: '100-195678-2',
          moneda: {
            codigo: 80,
            simbolo: '$',
            descripcion: 'Pesos'
          },
          estado: 'normal',
          es_cliente_empresa: false
        }
      ],
      es_cliente_empresa: false
    };
    service.getCuentas().subscribe((c) => cuentas = c);

    const req = httpMock.expectOne('http://localhost:3000/obi/inversiones/api/v1.0/cuentas');
    req.flush(mockRespuestaCuentas);

    expect(req.request.method).toBe('GET');
    expect(req.request.headers).toEqual((service as any).headers);
    expect(cuentas.cuentas.length).toBe(1);
    expect(cuentas).toEqual(mockRespuestaCuentas);
  });

  it('Debe obtener las tenencias de bonos cuando se llama a getTenenciasDolarMep()', () => {
    let tenencias;
    service.getTenenciasDolarMep().subscribe((t) => tenencias = t);

    const req = httpMock.expectOne('http://localhost:3000/obi/inversiones/api/v1.0/dolar-mep/tenencias');
    req.flush(mockRespuestaTenenciasDolarMep);

    expect(req.request.method).toBe('GET');
    expect(req.request.headers).toEqual((service as any).headers);
    expect(tenencias).toEqual(mockRespuestaTenenciasDolarMep);
  });

  it('Debe obtener los detalles de ventas getDetalleVenta()', () => {
    let detallesVentas: DetalleVentas;
    service.getDetalleVenta().subscribe((vt: DetalleVentas) => detallesVentas = vt);

    const req = httpMock.expectOne('http://localhost:3000/obi/inversiones/api/v1.0/dolar-mep/detalle_venta');
    req.flush(mockRespuestaDetalleVentas);

    expect(req.request.method).toBe('GET');
    expect(req.request.headers).toEqual((service as any).headers);
    expect(detallesVentas).toEqual(mockRespuestaDetalleVentas);
  });

  it('Debe obtener los detalles de compras getDetalleCompras()', () => {
    let detallesCompras: DetalleCompras;
    const monto = 620034.23;
    service.getDetalleCompra(monto).subscribe((vc: DetalleCompras) => detallesCompras = vc);

    const req = httpMock.expectOne(`http://localhost:3000/obi/inversiones/api/v1.0/dolar-mep/detalle_compra?inversion=${monto}`);
    req.flush(mockRespuestaDetalleCompras);

    expect(req.request.method).toBe('GET');
    expect(req.request.headers).toEqual((service as any).headers);
    expect(detallesCompras).toEqual(mockRespuestaDetalleCompras);
  });

  it('Debe generar una solicitud de venta cuando se llama a postVentaDolarMep()', () => {
    let venta;
    const mockRespuestaVenta = {
      numero_operacion: 643277273462
    };

    const body = {
      cantidad_nominal: 1000,
      id_cuenta_credito: '02110000020000000195678000000000001002',
      id_cuenta_debito: '02110000800000000195678000000000002002'
    };

    service.postVentaDolarMep(body).subscribe((v) => venta = v);

    const req = httpMock.expectOne('http://localhost:3000/obi/inversiones/api/v1.0/dolar-mep/ventas');
    req.flush(mockRespuestaVenta);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(body);
    expect(req.request.headers).toEqual((service as any).headers);
    expect(venta).toEqual(mockRespuestaVenta);
  });

  it('Debe obtener el listado de los paises getPaises()', () => {
    let paises: Pais[];

    service.getPaises().subscribe((vt: Pais[]) => paises = vt);

    const req = httpMock.expectOne('http://localhost:3000/obi/inversiones/api/v1.0/catalogos/paises');
    req.flush(mockPaises);

    expect(req.request.method).toBe('GET');
    expect(req.request.headers).toEqual((service as any).headers);
    expect(paises).toEqual(mockPaises);
  });

  it('Debe generar una solicitud de venta cuando se llama a postOnboarding()', () => {
    let onboarding;

    const body = {
      "fatca": {
        "pais_ciudadania": {
          "codigo": 80,
          "nombre": "Argentina"
        },
        "residencia": {
          "pais": {
            "codigo": 80,
            "nombre": "Argentina"
          },
          "direccion": "Río de Janeiro 1725",
          "ciudad": "Villa Allende",
          "estado": "Córdoba",
          "cp": 5105
        },
        "numero_tributario": 23343270432
      },
      "pep": {
        "motivo": "string"
      },
      "actividad_laboral": "Empleado de comercio",
      "aceptacion_tyc_iol": true,
      "aceptacion_tyc_spv": true,
      "telefono": "string"
    };

    service.postOnboarding(body).subscribe((v) => onboarding = v);

    const req = httpMock.expectOne('http://localhost:3000/obi/inversiones/api/v1.0/dolar-mep/onboarding');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(body);
    expect(req.request.headers).toEqual((service as any).headers);
  });

  it('Debe obtener el listado de los paises getTerminosCondiciones()', () => {
    let ttcc;
    const tipoTermino = 'iol'

    service.getTerminosCondiciones(tipoTermino).subscribe((vt) => ttcc = vt);

    const req = httpMock.expectOne(`http://localhost:3000/obi/inversiones/api/v1.0/tycs/${tipoTermino}`);
    req.flush(mockTtcc);

    expect(req.request.method).toBe('GET');
    expect(req.request.headers).toEqual((service as any).headers);
    expect(ttcc).toEqual(mockTtcc);
  });
});
