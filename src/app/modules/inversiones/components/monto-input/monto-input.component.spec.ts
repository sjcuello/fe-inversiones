import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../../shared/shared.module';

import { MontoInputComponent } from './monto-input.component';

describe('MontoInputComponent', () => {
  let component: MontoInputComponent;
  let fixture: ComponentFixture<MontoInputComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MontoInputComponent],
      imports: [SharedModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontoInputComponent);
    component = fixture.componentInstance;
    component.montoMaximo = 100000;
    component.montoMinimo = 150;
    component.muestraMensaje = false;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe reemplazar los caracteres incorrectos', () => {
    component.formMonto.controls.monto.setValue('qw123');
    component.formatearConDecimales();
    expect(component.formMonto.controls.monto.value).toBe('123');
  });

  it('Debe agregar el signo $, los puntos y decimales correctamente', () => {
    component.formMonto.controls.monto.setValue('1234');
    component.agregarSimboloYPuntos();
    expect(component.formMonto.controls.monto.value).toBe('$ 1.234,00');
  });

  it('Debe retirar el signo $, los puntos y decimales correctamente', () => {
    component.formMonto.controls.monto.setValue('$ 1.234,00');
    component.retirarSimboloYPuntos();
    expect(component.formMonto.controls.monto.value).toBe('1234');
  });

  it('Debe retornar el valor del input', () => {
    component.formMonto.controls.monto.setValue('1234');
    expect(component.getValor).toEqual('1234');
  });

  it('Debe cambiar el valor de la variable muestraMensaje dejandola siempre positiva', () => {
    jest.useFakeTimers();
    component.muestraErrores();
    jest.runAllTimers();
    expect(component.muestraMensaje).toBeTruthy();
  });
});
