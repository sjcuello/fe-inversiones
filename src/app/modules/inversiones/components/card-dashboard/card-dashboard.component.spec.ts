import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardDashboardComponent } from './card-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { CONSTANTES } from '../../constants';
import { TenenciasDolarMep } from '../../models/tenencias';

describe('CardDashboardComponent', () => {
  let component: CardDashboardComponent;
  let fixture: ComponentFixture<CardDashboardComponent>;
  let tenencias: TenenciasDolarMep;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardDashboardComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        AngularMaterialModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDashboardComponent);
    component = fixture.componentInstance;
    component.textosCard = CONSTANTES.PAGINA.HOME_DOLAR_MEP.PASOS;
    component.cargaDatos = false;
    component.cantidadParking = null;
    component.valorEstimadoParking = null;
    component.simboloParking = null;
    component.cantidadDisponible = null;
    component.valorEstimadoDisponible = null;
    component.simboloDisponible = null;
    fixture.detectChanges();
    tenencias = {
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
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe emitir el click en el botón', () => {
    spyOn(component.accionBoton, 'emit');
    component.clickBoton();
    expect(component.accionBoton.emit).toHaveBeenCalledTimes(1);
  });

  it('Debe mostrar la tenencia en parking del bono AL30', () => {
    component.tenencia = tenencias;
    expect(component.inicializarValoresParking());
    expect(component.cantidadParking).toBe(6);
    expect(component.valorEstimadoParking).toBe(205.62);
    expect(component.simboloParking).toBe('u$s');
    expect(component.cargaDatos).toBeTruthy();
    expect(component.recargaTenencia).toBeFalsy();
  });

  it('Debe mostrar la tenencia disponible del bono AL30 para vender', () => {
    component.tenencia = tenencias;
    expect(component.inicializarValoresDisponible());
    expect(component.cantidadDisponible).toBe(4);
    expect(component.valorEstimadoDisponible).toBe(137.08);
    expect(component.simboloDisponible).toBe('u$s');
    expect(component.cargaDatos).toBeTruthy();
    expect(component.recargaTenencia).toBeFalsy();
  });

  it('Debe emitir el click en el icono de recarga', () => {
    spyOn(component.accionIcono, 'emit');
    component.clickIcono();
    expect(component.accionIcono.emit).toHaveBeenCalledTimes(1);
    expect(component.recargaTenencia).toBeTruthy();
    expect(component.cargaDatos).toBeFalsy();
  });

});
