import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { FakeMatIconRegistry } from '@angular/material/icon/testing';

import { InstanciaIconosService } from './instancia-iconos.service';

describe('InstanciaIconosService', () => {
  let service: InstanciaIconosService;
  let fixture: ComponentFixture<InstanciaIconosService>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        MatIconModule
      ],
      providers: [
        { provide: MatIconRegistry, useClass: FakeMatIconRegistry }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    service = TestBed.inject(InstanciaIconosService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe instanciar los elementos que son pasados como parametro', ()=>{
    expect(service.inicializaIconos([])).toBeUndefined();
  });

  it('Debe instanciar los elementos que son pasados como parametros', ()=>{
    const icons = [
      'icon-tooltip-square', 'icon-link-redirect', 'icon-alert-red',
    ];
    expect(service.inicializaIconos(icons)).toBeUndefined();
  });
});
