import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CONSTANTES } from '../../constants';
import { Modal } from '../../models/modal';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  const dialogMock = {
    close: () => {},
  };
  const data: Modal = {
    contenido: 'Este es el contenido',
    titulo: 'Titulo'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [AngularMaterialModule, SharedModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: dialogMock }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.infoModal.titulo = CONSTANTES.PAGINA.DECLARACION_JURADA.TITULO;
    component.infoModal.contenido = CONSTANTES.PAGINA.DECLARACION_JURADA.CONTENIDO;
    component.textosBoton = CONSTANTES.GENERICO;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia cerrar el componente cuando se hace click en alguno de los botones', () => {
    jest.spyOn(component.dialogRef, 'close');
    const parametro = true;
    component.cerrarModal(parametro);
    fixture.detectChanges();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
