import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Cuenta, CuentaEstado } from 'src/app/shared/models/cuenta';
import { SharedModule } from 'src/app/shared/shared.module';
import { CONSTANTES } from '../../constants';
import { DetalleCompras } from '../../models/detalle-compras';
import { DetalleSolicitudComponent } from './detalle-solicitud.component';

describe('DetalleSolicitudComponent', () => {
  let component: DetalleSolicitudComponent;
  let fixture: ComponentFixture<DetalleSolicitudComponent>;
  let cuentaSeleccionada: Cuenta;
  let detalleCompra: DetalleCompras;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleSolicitudComponent],
      imports: [SharedModule, BrowserAnimationsModule, BrowserModule, HttpClientModule]
    })
      .compileComponents();

    cuentaSeleccionada = {
      tipo_cuenta: 'CA',
      moneda: { simbolo: '$', descripcion: 'Pesos', codigo: 80 },
      numero: '5-8827-3',
      saldo: 30000,
      codigo_paquete: 123,
      estado: CuentaEstado.normal,
      identificador: '1-21-80-0-1-0-36-54269-4',
    };

    detalleCompra = {
      inversion: {
        moneda: {
          codigo: 80,
          simbolo: '$',
          descripcion: 'Pesos'   
        },   
        monto: 12000
      },
      porcentaje_comision_compra: 0.5,
      porcentaje_derechos_mercado: 0.01,
      comision_compra: {
        moneda: {
          codigo: 80,
          simbolo: '$',
          descripcion: 'Pesos'       
        },    
        monto: 60
      },
      derechos_mercado: {
        moneda: {
          codigo: 80,
          simbolo: '$',
          descripcion: 'Pesos'        
        },       
        monto: 1.2
      },
      cotizacion_dolar_mep: {
        moneda: {
          codigo: 80,
          simbolo: '$',
          descripcion: 'Pesos'
        },
        monto: 130.47
      },
      compra_estimada: {
        moneda: {
          codigo: 2,
          simbolo: "u$s",
          descripcion: "Dólares"
        },
        monto: 91.51
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSolicitudComponent);
    component = fixture.componentInstance;
    component.textoConfirmacion = CONSTANTES.PAGINA.COMPRA_DOLAR_MEP.DETALLE_SOLICITUD;
    component.detalleCompra = detalleCompra;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deben inicializarse las variables del componente con inicializaDetalle()', () => {
    component.inicializaDetalle();

    expect(component.detalleInversion).toBe(detalleCompra.inversion);
    expect(component.detalleComisionCompra).toBe(detalleCompra.comision_compra);
    expect(component.detalleDerechosMercado).toBe(detalleCompra.derechos_mercado);
    expect(component.detalleCotizacionDolarMep).toBe(detalleCompra.cotizacion_dolar_mep);
    expect(component.detallePesosEstimado).toBe(detalleCompra.dinero_operacion);
  });
});
