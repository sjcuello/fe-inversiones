import { CdkStepper } from '@angular/cdk/stepper';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of, throwError } from 'rxjs';
import { CuentasCliente } from '../../../../../inversiones/models/cuenta';
import { InversionesService } from '../../../../../inversiones/services/inversiones.service';
import { CuentaEstado } from '../../../../../../shared/models/cuenta';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StepperComponent } from '../../../../components/stepper/stepper.component';

import { VentaDolarMepComponent } from './venta-dolar-mep.component';
import { DetalleVentas } from 'src/app/modules/inversiones/models/detalle-ventas';
import { Route } from 'src/app/modules/inversiones/enums/route-enum';

describe('VentaDolarMepComponent', () => {
  let component: VentaDolarMepComponent;
  let fixture: ComponentFixture<VentaDolarMepComponent>;
  let mockInversionesService;
  let cuentas: CuentasCliente;
  let detalleVenta: DetalleVentas;
  beforeEach(async(() => {
    mockInversionesService = {
      getCuentas: jest.fn(() => of(cuentas)),
      getDetalleVenta: jest.fn(() => of(detalleVenta)),
      postVentaDolarMep: jest.fn(),
    };

    const mockJwtHelperService = {
      getTokenExpirationDate: jest.fn()
    };

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
          tipo_cuenta: 'CC',
          moneda: { simbolo: '$', descripcion: 'Pesos', codigo: 80 },
          numero: '100-6953122-4',
          saldo: 30000,
          estado: CuentaEstado.normal,
          identificador: '1-21-80-0-1-0-36-54269-4'
        },
        {
          identificador: '1-21-2-0-1-0-5-8827-5',
          tipo_cuenta: 'CA',
          saldo: 14256.89,
          numero: '5-8827-5',
          moneda: { codigo: 2, simbolo: 'u$s', descripcion: 'Dólares' },
          estado: CuentaEstado.normal
        }
      ],
      es_cliente_empresa: false
    };

    detalleVenta = {
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

    TestBed.configureTestingModule({
      declarations: [
        VentaDolarMepComponent,
        StepperComponent
      ],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: InversionesService, useValue: mockInversionesService },
        { provide: JwtHelperService, useValue: mockJwtHelperService },
        { provide: CdkStepper, useExisting: StepperComponent }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaDolarMepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deben setearse las cuentas desde el CuentaService y definir las predeterminadas', () => {
    component.getCuentas();

    expect(component.cuentasEnPesos.length).toBe(3);
    expect(component.cuentasEnDolares.length).toBe(1);
    expect(component.estaCargandoCuentas).toBe(false);
    expect(component.tieneErrorCuentas).toBe(false);
    expect(component.cuentaSeleccionadaPesos).toBe(cuentas.cuentas[0]);
    expect(component.cuentaSeleccionadaDolares).toBe(cuentas.cuentas[3]);
  });

  it('Debe mostrar error al fallar el endpoint de cuentas', () => {
    mockInversionesService.getCuentas.mockImplementation(() => throwError({}));
    fixture.detectChanges();

    component.getCuentas();

    expect(component.estaCargandoCuentas).toBe(false);
    expect(component.deshabilitarContinuar).toBe(true);
    expect(component.tieneErrorCuentas).toBe(true);
  });

  it('Debe setear la cuenta en dólares seleccionada', () => {
    const mockIdentificador = '1-21-2-0-1-0-5-8827-5';

    component.seleccionarCuentaDolares(mockIdentificador);

    expect(component.cuentaSeleccionadaDolares).toBe(cuentas.cuentas[3]);
  });

  it('Debe setear la cuenta en pesos seleccionada', () => {
    const mockIdentificador = '1-21-80-0-1-0-36-54269-3';

    component.seleccionarCuentaPesos(mockIdentificador);

    expect(component.cuentaSeleccionadaPesos).toBe(cuentas.cuentas[1]);
  });

  it('Debe mostrarse la pantalla de venta exitosa al realizar postVentaDolarMep', () => {
    const mockVenta = {
      cantidad_nominales: 1000,
      id_cuenta_credito: '02110000020000000195678000000000001002',
      id_cuenta_debito: '02110000800000000195678000000000002002'
    };
    mockInversionesService.postVentaDolarMep.mockReturnValue(of(mockVenta));
    fixture.detectChanges();

    component.postVentaDolarMep();

    expect(component.ventaExitosa).toBe(true);
    expect(component.mostrarErrorPantallaCompleta).toBe(false);
  });

  it('Debe mostrarse la pantalla de error al fallar postVentaDolarMep', () => {
    mockInversionesService.postVentaDolarMep.mockReturnValue(throwError({}));
    fixture.detectChanges();

    component.postVentaDolarMep();

    expect(component.ventaExitosa).toBe(false);
    expect(component.mostrarErrorPantallaCompleta).toBe(true);
  });

  it('Debe setearse el detalle de la venta', () => {
    component.getDetalleVenta();

    expect(component.detalleVenta).toBe(detalleVenta);
  });

  it('Debe mostrar error al fallar el endpoint del detalle', () => {
    mockInversionesService.getDetalleVenta.mockImplementation(() => throwError({}));
    fixture.detectChanges();

    component.getDetalleVenta();

    expect(component.detalleVenta).toBe(null);
  });

  it('Debe redireccionar al Home sin estado', () => {
    spyOn((component as any).router, 'navigate');
    component.volverHome();
    expect((component as any).router.navigate).toHaveBeenCalledWith([Route.HomeDolarMep]);
  });

  it('Debe cambiar el estado de disponibilidad del boton', () => {
    component.deshabilitarConfirmar = false;
    fixture.detectChanges();
    component.validaCheckbox(false);
    expect(component.deshabilitarConfirmar).toBeTruthy();
  });
});
