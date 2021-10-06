import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoTeclado } from '../../enums/teclado-enum';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BotonComponent } from './boton.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';

describe('BotonComponent', () => {
  let component: BotonComponent;
  let fixture: ComponentFixture<BotonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        SharedModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [BotonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe emitir el click en el botón', () => {
    spyOn(component.accionBoton, 'emit');
    component.emitirAccionBoton();

    expect(component.accionBoton.emit).toHaveBeenCalledTimes(1);
  });

  it('Debe emitir la acción del botón al presionar "Enter" con el teclado', () => {
    const mockKeyboardEvent = { code: CodigoTeclado.Enter };
    spyOn(component, 'emitirAccionBoton');
    component.emitirPorTeclado(mockKeyboardEvent);

    expect(component.emitirAccionBoton).toHaveBeenCalledTimes(1);
  });

  it('Debe emitir la acción del botón al presionar "Espacio" con el teclado', () => {
    const mockKeyboardEvent = { code: CodigoTeclado.Space };
    spyOn(component, 'emitirAccionBoton');
    component.emitirPorTeclado(mockKeyboardEvent);

    expect(component.emitirAccionBoton).toHaveBeenCalledTimes(1);
  });

  it('No debe emitir la acción del botón al presionar una tecla diferente a espacio o enter con el teclado', () => {
    const mockKeyboardEvent = { code: 'a' };
    spyOn(component, 'emitirAccionBoton');
    component.emitirPorTeclado(mockKeyboardEvent);

    expect(component.emitirAccionBoton).toHaveBeenCalledTimes(0);
  });

  it('Se inicializa componente y se settea icono a la derecha', () => {
    component.iconoBotonDerecha = "icono"
    spyOn(component, 'registraBoton');
    component.ngOnInit();
    expect(component.registraBoton).toHaveBeenCalledTimes(1);
  });
});
