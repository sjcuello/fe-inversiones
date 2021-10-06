import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CuentasDropdownComponent } from './cuentas-dropdown.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CuentaEstado } from 'src/app/shared/models/cuenta';

describe('CuentasDropdownComponent', () => {
  let component: CuentasDropdownComponent;
  let fixture: ComponentFixture<CuentasDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CuentasDropdownComponent
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe generar el texto a mostrar para la cuenta', () => {
    const mockCuenta =  {
      tipo_cuenta: 'CA',
      moneda: { simbolo: '$', descripcion : 'Pesos' },
      numero: '100-3553105-3',
      saldo: 100,
      estado: CuentaEstado.normal,
      identificador: '1-21-80-0-1-0-36-54269-2',
      codigo_paquete: null,
    };

    expect(component.generarOpcionesDropdownCuentas(mockCuenta)).toBe(`C.A. N° 100-3553105-3
            Saldo: $ 100,00`);
  });

  it('Debe generar el texto a mostrar para la cuenta sin saldo', () => {
    const mockCuenta =  {
      tipo_cuenta: 'CA',
      moneda: { simbolo: '$', descripcion : 'Pesos' },
      numero: '100-3553105-3',
      saldo: 0,
      estado: CuentaEstado.normal,
      identificador: '1-21-80-0-1-0-36-54269-2',
      codigo_paquete: null,
    };

    expect(component.generarOpcionesDropdownCuentas(mockCuenta)).toBe(`C.A. N° 100-3553105-3
            Sin saldo`);
  });

  it('Debe emitir el identificador de la cuenta seleccionada', () => {
    const mockSelect =  { value: '1-21-80-0-1-0-36-54269-2' };

    spyOn(component.accionSeleccionarCuenta, 'emit');

    component.seleccionarCuenta(mockSelect);

    expect(component.cuentaSeleccionada).toBe('1-21-80-0-1-0-36-54269-2');
    expect(component.accionSeleccionarCuenta.emit).toHaveBeenCalledTimes(1);
  });
});
