import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleConfirmacionComponent } from './detalle-confirmacion.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CONSTANTES } from '../../constants';
import { HttpClientModule } from '@angular/common/http';
import { DetalleVentas } from '../../models/detalle-ventas';
describe('DetalleConfirmacionComponent', () => {
  let component: DetalleConfirmacionComponent;
  let fixture: ComponentFixture<DetalleConfirmacionComponent>;
  let detalle: DetalleVentas;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleConfirmacionComponent],
      imports: [SharedModule, BrowserAnimationsModule, HttpClientModule]
    })
      .compileComponents();

    detalle = {
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

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleConfirmacionComponent);
    component = fixture.componentInstance;
    component.textoConfirmacion = CONSTANTES.PAGINA.VENTA_DOLAR_MEP.DETALLE_CONFIRMACION;
    component.detalleVenta = detalle;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deben inicializarse las variables del componente con inicializaDetalle()', () => {
    component.inicializaDetalle();

    expect(component.venta).toBe(detalle.estimados.venta);
    expect(component.comisionVenta).toBe(detalle.estimados.comision_venta);
    expect(component.credito).toBe(detalle.estimados.credito);
    expect(component.derechosMercado).toBe(detalle.estimados.derechos_mercado);
  });

});
