import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TotalizadorCuentasComponent } from './totalizador-cuentas.component';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr, 'es-Ar');
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Saldo } from '../../../../shared/models/saldo';
import { AngularMaterialModule } from '../../../../angular-material.module';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  template: '<ftya-totalizador-cuentas [saldos]="saldos"></ftya-totalizador-cuentas>'
})
class TestHostComponent {
  saldos: Saldo[];
}

describe('TotalizadorCuentasComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let componentTotalizadorCuentas: TotalizadorCuentasComponent;
  let saldosMock: Saldo[];
  let negativeSaldoMock: Saldo[];
  let saldosEnCeroMock: Saldo[];
  let sinCuentaEnDolaresMock: Saldo[];
  let mockGoogleAnalyticsService;

  beforeEach(async(() => {

    mockGoogleAnalyticsService = {
      clickEnVerCuentas: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        TotalizadorCuentasComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        AngularMaterialModule,
        HttpClientModule,
        SharedModule,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    componentTotalizadorCuentas = fixture.debugElement.query(By.directive(TotalizadorCuentasComponent)).componentInstance;

    saldosMock = [
      {
        moneda: { simbolo: '$', descripcion: 'Pesos' },
        monto: 111.11
      },
      {
        moneda: { simbolo: 'u$s', descripcion: 'Dólares' },
        monto: 222.22
      }
    ];

    negativeSaldoMock = [
      {
        moneda: { simbolo: '$', descripcion: 'Pesos' },
        monto: -5000
      },
      {
        moneda: { simbolo: '$', descripcion: 'Dólares' },
        monto: 5000
      },
    ];

    saldosEnCeroMock = [
      {
        moneda: { simbolo: '$', descripcion: 'Pesos' },
        monto: 0
      },
      {
        moneda: { simbolo: 'u$s', descripcion: 'Dólares' },
        monto: 0
      }
    ];

    sinCuentaEnDolaresMock = [
      {
        moneda: { simbolo: '$', descripcion: 'Pesos' },
        monto: 100000
      }
    ];
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería mostrar el saldo con la clase adecuada cuando el usuario tiene un saldo negativo', () => {
    fixture.componentInstance.saldos = negativeSaldoMock;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.totalizador-saldos')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.totalizador-saldos-sin-cuentas')).length).toBe(0);
    expect(fixture.debugElement.queryAll(By.css('.totalizador-saldos__saldo[data-moneda="$"].saldo_negativo')).length).toBe(1);
  });

  it('Debería mostrar los saldos que recibe cuando tiene saldos de todas las monedas', () => {
    fixture.componentInstance.saldos = saldosMock;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.totalizador-saldos')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.notranslate')).length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css('.totalizador-saldos__saldo[data-moneda="$"]')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.totalizador-saldos__saldo[data-moneda="u$s"]')).length).toBe(1);
  });

  it('Debería mostrar el saldo cuando lo recibe con monto cero', () => {
    fixture.componentInstance.saldos = saldosEnCeroMock;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.totalizador-saldos')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.notranslate')).length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css('.totalizador-saldos__saldo[data-moneda="$"]')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.totalizador-saldos__saldo[data-moneda="u$s"]')).length).toBe(1);
  });

  it('Debería mostrar la fecha en formato dd/mm si tiene saldos', () => {
    fixture.componentInstance.saldos = saldosMock;
    fixture.detectChanges();

    const datePipe: DatePipe = new DatePipe('es-AR');
    const fechaActual = datePipe.transform(new Date(), 'dd/MM');
    const titleElement = fixture.debugElement.query(By.css('.totalizador-saldos__header'));

    expect(titleElement.nativeElement.textContent.trim()).toBe(`Saldo total en tus cuentas al ${fechaActual}`);
  });

  it('Debería mostrar mensaje de advertencia si no tiene cuenta en dólares', () => {
    fixture.componentInstance.saldos = sinCuentaEnDolaresMock;
    fixture.detectChanges();

    const mensajeAdvertencia = 'Para realizar esta operación dirigite a tu sucursal más cercana para abrir tu caja de ahorro en dólares.';
    const titleElement = fixture.debugElement.query(By.css('.totalizador-saldos__header.totalizador-saldos__header-sin-dolares'));

    expect(titleElement.nativeElement.textContent.trim()).toBe(mensajeAdvertencia);
  });
});
