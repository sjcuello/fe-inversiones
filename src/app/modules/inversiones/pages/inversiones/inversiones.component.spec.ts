import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CuentasPosicion } from '../../../../shared/models/cuentas-posicion';
import { CuentaService } from '../../../../core/services/cuenta.service';
import { SharedModule } from '../../../../shared/shared.module';
import { TotalizadorCuentasComponent } from '../../components/totalizador-cuentas/totalizador-cuentas.component';
import { CuentaEstado } from '../../../../shared/models/cuenta';

import { InversionesComponent } from './inversiones.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { Route } from '../../enums/route-enum';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('InversionesComponent', () => {
  let component: InversionesComponent;
  let fixture: ComponentFixture<InversionesComponent>;
  let mockCuentaService;
  let cuentas: CuentasPosicion;

  const mockDialogRef = {
    open: jest.fn(),
  };

  const mockJwtHelperService = {
    getTokenExpirationDate: jest.fn()
  };

  beforeEach(async(() => {
    mockCuentaService = {
      getTotalesCuentas: jest.fn(() => of(cuentas))
    };

    cuentas = {
      cuenta_predeterminada: '1-21-80-0-1-0-36-54269-2',
      cuentas: [
        {
          tipo_cuenta: 'CA',
          moneda: { simbolo: '$', descripcion : 'Pesos' },
          numero: '100-3553105-3',
          saldo: 30000,
          estado: CuentaEstado.normal,
          identificador: '1-21-80-0-1-0-36-54269-2',
          codigo_paquete: null,
        },
        {
          tipo_cuenta: 'CA',
          moneda: { simbolo: '$', descripcion: 'Pesos' },
          numero: '100-6655505-9',
          saldo: 5000,
          estado: CuentaEstado.normal,
          identificador: '1-21-80-0-1-0-36-54269-3',
          codigo_paquete: null,
        },
        {
          tipo_cuenta: 'CA',
          moneda: { simbolo: '$', descripcion: 'Pesos' },
          numero: '100-6953122-4',
          saldo: 30000,
          estado: CuentaEstado.normal,
          identificador: '1-21-80-0-1-0-36-54269-4',
          codigo_paquete: null,
        },
      ],
      saldos: [
        {
          monto: 65000,
          moneda: { simbolo: '$', descripcion: 'Pesos' },
        }
      ],
      es_cliente_empresa: false,
    };

    TestBed.configureTestingModule({
      declarations: [ InversionesComponent, TotalizadorCuentasComponent ],
      imports: [ HttpClientTestingModule, SharedModule, BrowserAnimationsModule, RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: CuentaService, useValue: mockCuentaService },
        { provide: MatDialog, useValue: mockDialogRef },
        { provide: JwtHelperService, useValue: mockJwtHelperService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

});
