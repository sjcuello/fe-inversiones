import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of, throwError } from 'rxjs';
import { CardDashboardComponent } from 'src/app/modules/inversiones/components/card-dashboard/card-dashboard.component';
import { Route } from 'src/app/modules/inversiones/enums/route-enum';
import { Cotizacion } from 'src/app/modules/inversiones/models/cotizacion';
import { TenenciasDolarMep } from 'src/app/modules/inversiones/models/tenencias';
import { InversionesService } from 'src/app/modules/inversiones/services/inversiones.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { DolarMepComponent } from './dolar-mep.component';

describe('DolarMepComponent', () => {
  let component: DolarMepComponent;
  let fixture: ComponentFixture<DolarMepComponent>;
  let mockInversionesService;
  let cotizaciones: Cotizacion[];
  let tenencias: TenenciasDolarMep;
  let sinTenencias: TenenciasDolarMep;
  beforeEach(async(() => {
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

    sinTenencias = {
      parking: {
        simbolo: 'AL30',
        cantidad_nominales: 0,
        monto: {
          moneda: {
            codigo: 2,
            simbolo: 'u$s',
            descripcion: 'Dólares'
          },
          monto: 0
        }
      },
      disponible: {
        simbolo: 'AL30',
        cantidad_nominales: 0,
        monto: {
          moneda: {
            codigo: 2,
            simbolo: 'u$s',
            descripcion: 'Dólares'
          },
          monto: 0
        }
      }
    };

    mockInversionesService = {
      getCotizaciones: jest.fn(() => of(cotizaciones)),
      calcularCotizacionDolarMep: jest.fn(() => ({ precioCompra: 145, precioVenta: 142 })),
      getTenenciasDolarMep: jest.fn(() => of(tenencias)),
    };
    const mockJwtHelperService = {
      getTokenExpirationDate: jest.fn()
    };
    const mockRouter = {
      url: Route.HomeDolarMep,
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [DolarMepComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: InversionesService, useValue: mockInversionesService },
        { provide: JwtHelperService, useValue: mockJwtHelperService },
        { provide: Router, useValue: mockRouter },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DolarMepComponent);
    component = fixture.componentInstance;
    component.ventaEfectuada = false;
    component.cardParking = new CardDashboardComponent();
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deben obtenerse las cotizaciones de dólar mep desde el InversionesService', () => {
    component.getCotizaciones();

    expect(component.estaCargandoCotizaciones).toBe(false);
    expect(component.tieneErrorCotizaciones).toBe(false);
    expect(component.precioCompraDolarMep).toBe(145);
  });

  it('Debe mostrarse error al fallar la llamada a cotizaciones', () => {
    mockInversionesService.getCotizaciones.mockImplementation(() => throwError({}));
    fixture.detectChanges();

    component.getCotizaciones();

    expect(component.estaCargandoCotizaciones).toBe(false);
    expect(component.tieneErrorCotizaciones).toBe(true);
  });

  it('Debe navegar el flujo de compra', () => {
    spyOn((component as any).router, 'navigate');
    component.navegarCompra();

    expect((component as any).router.navigate).toHaveBeenCalledWith([Route.CompraDolarMep]);
  });

  it('Debe navegar el flujo de venta', () => {
    spyOn((component as any).router, 'navigate');
    component.navegarVenta();

    expect((component as any).router.navigate).toHaveBeenCalledWith([Route.VentaDolarMep]);
  });

  it('Deben asignarse nuevos valores en el caso de no tener nominales en tenencia ', () => {
    mockInversionesService.getTenenciasDolarMep.mockReturnValue(of(sinTenencias));
    fixture.detectChanges();
    component.getTenenciasDolarMep();
    expect(component.tenencia).toBe(sinTenencias);
    expect(component.consultaTenencia).toBe(true);
  });

  it('Deben obtenerse las tenencias de bonos desde el InversionesService', () => {
    component.getTenenciasDolarMep();
    expect(component.tenencia).toBe(tenencias);
    expect(component.consultaTenencia).toBe(true);
  });

  it('Debe asignar null a las tenencias si falla el endpoint de obtener tenencias', () => {
    mockInversionesService.getTenenciasDolarMep.mockImplementation(() => throwError({}));
    fixture.detectChanges();
    component.getTenenciasDolarMep();
    expect(component.consultaTenencia).toBe(true);
    expect(component.tenencia).toBe(null);
  });

  it('Debe descargar el pdf de términos y condiciones', () => {
    component.downloadPdf();
  });
});
