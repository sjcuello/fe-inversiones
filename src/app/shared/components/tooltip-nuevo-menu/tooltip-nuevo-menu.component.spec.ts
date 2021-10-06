import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipNuevoMenuComponent } from './tooltip-nuevo-menu.component';
import { By } from '@angular/platform-browser';
import { ClienteService } from '../../../core/services/cliente.service';
import { Cliente, Preferencias } from '../../models/cliente';

describe('TooltipNuevoMenuComponent', () => {
  let component: TooltipNuevoMenuComponent;
  let fixture: ComponentFixture<TooltipNuevoMenuComponent>;
  let mockCliente: Cliente;
  let mockPreferencias: Preferencias;
  let mockClienteService;

  beforeEach(async(() => {

    mockClienteService = {
        updatePreferencias: jest.fn()
    };

    mockClienteService.updatePreferencias(mockPreferencias);
    TestBed.configureTestingModule({
      declarations: [TooltipNuevoMenuComponent],
      providers: [
        { provide: ClienteService, useValue: mockClienteService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipNuevoMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockPreferencias = {
      clave_por_vencer: true, vio_menu: false, vio_notificacion_clave: false
    };

    mockCliente = {
      nombre: null,
      apellido: null,
      ultimo_login: null,
      preferencias: mockPreferencias,
      fecha_expiracion_clave: new Date(),
      email: '',
      tiene_activa_clave_sms: false,
      celular: ''
    };

    sessionStorage.clear();
    sessionStorage.setItem('cliente', JSON.stringify(mockCliente));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Deberia ocultar el tooltip de nuevo menu si el cliente tiene como preferencia vio_menu en true', () => {
    mockPreferencias = {
      vio_menu: true
    };

    mockCliente = {
      nombre: null,
      apellido: null,
      ultimo_login: null,
      preferencias: mockPreferencias,
      fecha_expiracion_clave: new Date(),
      email: '',
      tiene_activa_clave_sms: false,
      celular: ''
    };

    sessionStorage.clear();
    sessionStorage.setItem('cliente', JSON.stringify(mockCliente));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.notificacion-popup.hidden')).length).toBe(1);
  });

  it('Deberia mostrar el tooltip de nuevo menu si el cliente tiene como preferencia vio_menu en false', () => {
    mockPreferencias = {
      vio_menu: false
    };

    mockCliente = {
      nombre: null,
      apellido: null,
      ultimo_login: null,
      preferencias: mockPreferencias,
      fecha_expiracion_clave: new Date(),
      email: null,
      tiene_activa_clave_sms: false,
      celular: ''
    };

    sessionStorage.clear();
    sessionStorage.setItem('cliente', JSON.stringify(mockCliente));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.notificacion-popup.hidden')).length).toBe(0);
  });

  it('Deberia llamar al servicio para actualizar las preferencias del cliente', () => {
    fixture.componentInstance.changeStatus(true);
    expect(mockClienteService.updatePreferencias).toHaveBeenCalledWith(mockPreferencias);
  });
});
