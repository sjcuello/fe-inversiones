import { CdkStepper } from '@angular/cdk/stepper';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of, throwError } from 'rxjs';
import { CuentasCliente } from '../../../../../inversiones/models/cuenta';
import { CuentaEstado } from '../../../../../../shared/models/cuenta';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StepperComponent } from '../../../../components/stepper/stepper.component';
import { Cotizacion } from '../../../../models/cotizacion';
import { InversionesService } from '../../../../services/inversiones.service';

import { CompraDolarMepComponent } from './compra-dolar-mep.component';
import { Router } from '@angular/router';
import { Route } from 'src/app/modules/inversiones/enums/route-enum';
import { DetalleCompras } from 'src/app/modules/inversiones/models/detalle-compras';

describe('CompraDolarMepComponent', () => {
  let component: CompraDolarMepComponent;
  let fixture: ComponentFixture<CompraDolarMepComponent>;
  let mockInversionesService;
  let cuentas: CuentasCliente;
  let cotizaciones: Cotizacion[];
  let detalleCompra: DetalleCompras;

  beforeEach(async(() => {
    mockInversionesService = {
      getCotizaciones: jest.fn(() => of(cotizaciones)),
      calcularCotizacionDolarMep: jest.fn(() => ({ precioCompra: 145, precioVenta: 142 })),
      postCompraDolarMep: jest.fn(),
      getCuentas: jest.fn(() => of(cuentas)),
      getDetalleCompra: jest.fn(() => of(detalleCompra))
    };
    const mockJwtHelperService = {
      getTokenExpirationDate: jest.fn()
    };

    cotizaciones = [
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

    cuentas = {
      cuenta_predeterminada: '1-21-80-0-1-0-36-54269-2',
      cuentas: [
        {
          tipo_cuenta: 'CA',
          moneda: { simbolo: '$', descripcion: 'Pesos', codigo: 80 },
          numero: '100-3553105-3',
          saldo: 30000,
          estado: CuentaEstado.normal,
          identificador: '1-21-80-0-1-0-36-54269-2'
        },
        {
          tipo_cuenta: 'CA',
          moneda: { simbolo: '$', descripcion: 'Pesos', codigo: 80 },
          numero: '100-6655505-9',
          saldo: 5000,
          estado: CuentaEstado.normal,
          identificador: '1-21-80-0-1-0-36-54269-3'
        },
        {
          tipo_cuenta: 'CA',
          moneda: { simbolo: '$', descripcion: 'Pesos', codigo: 80 },
          numero: '100-6953122-4',
          saldo: 30000,
          estado: CuentaEstado.normal,
          identificador: '1-21-80-0-1-0-36-54269-4',
        },
      ],
      es_cliente_empresa: false
    };

    detalleCompra = {
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
        monto: 1345.47
      }
    };

    const mockRouter = {
      url: Route.HomeDolarMep,
      navigate: jest.fn(),
    };
    TestBed.configureTestingModule({
      declarations: [CompraDolarMepComponent, StepperComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: InversionesService, useValue: mockInversionesService },
        { provide: JwtHelperService, useValue: mockJwtHelperService },
        { provide: CdkStepper, useExisting: StepperComponent },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraDolarMepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deben setearse las cuentas desde el CuentaService', () => {
    component.getCuentas();

    expect(component.cuentasEnPesos.length).toBe(3);
    expect(component.cuentaPredeterminada).toBe(cuentas.cuentas[0]);
    expect(component.cuentaSeleccionada).toBe(cuentas.cuentas[0]);
    expect(component.montoMaximo).toBe(cuentas.cuentas[0].saldo);
    expect(component.estaCargandoCuentas).toBe(false);
    expect(component.deshabilitarContinuar).toBe(false);
  });

  it('Deben deshabilitarse el boton continuar cuando las cuentas no poseen el monto mínimo del valor del dólar', () => {
    const mockCuentaSinSaldo = {
      cuenta_predeterminada: '1-21-80-0-1-0-36-54269-2',
      cuentas: [
        {
          tipo_cuenta: 'CA',
          moneda: { simbolo: '$', descripcion: 'Pesos' },
          numero: '100-3553105-3',
          saldo: 10,
          estado: CuentaEstado.normal,
          identificador: '1-21-80-0-1-0-36-54269-2',
          codigo_paquete: null,
        }
      ],
      saldos: [
        {
          monto: 10,
          moneda: { simbolo: '$', descripcion: 'Pesos' },
        }
      ],
      es_cliente_empresa: false,
    };
    mockInversionesService.getCuentas.mockReturnValue(of(mockCuentaSinSaldo));
    component.precioCompraDolarMep = 145;
    fixture.detectChanges();

    component.getCuentas();

    expect(component.cuentasEnPesos.length).toBe(1);
    expect(component.estaCargandoCuentas).toBe(false);
    expect(component.deshabilitarContinuar).toBe(true);
  });

  it('Deben setearse las cotizaciones de dólar mep desde el InversionesService', () => {
    component.getCotizaciones();

    expect(component.estaCargandoCotizaciones).toBe(false);
    expect(component.precioCompraDolarMep).toBe(145);
    expect(component.montoMinimo).toBe(145);
  });

  it('Deben setearse la cuenta elegida', () => {
    component.seleccionarCuenta(cuentas.cuentas[0].identificador);

    expect(component.montoMaximo).toBe(30000);
    expect(component.cuentaSeleccionada).toBe(cuentas.cuentas[0]);
    expect(component.deshabilitarContinuar).toBe(false);
  });

  it('Deben calcularse los dólares', () => {
    component.calcularDolares(10000);

    expect(component.dolaresAComprar).toBe(68.96551724137932);
    expect(component.deshabilitarContinuar).toBe(false);
  });

  it('Debe mostrar error al fallar el endpoint de cuentas', () => {
    mockInversionesService.getCuentas.mockImplementation(() => throwError({}));
    fixture.detectChanges();

    component.getCuentas();

    expect(component.estaCargandoCuentas).toBe(false);
    expect(component.deshabilitarContinuar).toBe(true);
    expect(component.tieneErrorCuentas).toBe(true);
  });

  it('Debe mostrar error al fallar el endpoint de cotizaciones', () => {
    mockInversionesService.getCotizaciones.mockImplementation(() => throwError({}));
    fixture.detectChanges();

    component.getCotizaciones();

    expect(component.estaCargandoCotizaciones).toBe(false);
    expect(component.mostrarErrorPantallaCompleta).toBe(true);
    expect(component.subtituloError).toBe('Se produjo un error al consultar la cotización. Por favor, volvé a intentar mas tarde.');
  });

  it('Debe mostrarse la pantalla de compra exitosa al realizar postCompraDolarMep', () => {
    const mockCompra = {
      numero_operacion: 123
    };
    mockInversionesService.postCompraDolarMep.mockReturnValue(of(mockCompra));
    fixture.detectChanges();

    component.postCompraDolarMep();

    expect(component.estaCargandoCompras).toBe(false);
    expect(component.mostrarErrorPantallaCompleta).toBe(false);
    expect(component.compraExitosa).toBe(true);
  });

  it('Debe mostrarse la pantalla de error al fallar postCompraDolarMep', () => {
    mockInversionesService.postCompraDolarMep.mockReturnValue(throwError({}));
    fixture.detectChanges();

    component.postCompraDolarMep();

    expect(component.estaCargandoCompras).toBe(false);
    expect(component.mostrarErrorPantallaCompleta).toBe(true);
    expect(component.compraExitosa).toBe(false);
    expect(component.subtituloError).toBe('Se produjo un error al realizar la compra de tus bonos. Por favor, volvé a intentar mas tarde.');
  });

  it('Debe redireccionar al Home', () => {
    spyOn((component as any).router, 'navigate');
    component.cerrar();
    expect((component as any).router.navigate).toHaveBeenCalledWith([Route.HomeDolarMep]);
  });

  it('Debe setearse el detalle de la compra', () => {
    component.getDetalleCompra();

    expect(component.detalleCompra).toBe(detalleCompra);
  });
});
