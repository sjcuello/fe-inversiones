import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleComponent],
      imports: [
        SharedModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    component.pulsado = false
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.pulsado).toEqual(false);
  });

  it('Se hace click en el toggle y se valida cambio de valor en pulsado', () => {
    component.click();
    expect(component.pulsado).toEqual(true);
  });
});
