import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
    component.encendido = true;
    component.nombreClase = 'toggle'
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.encendido).toEqual(true);
    expect(component.nombreClase).toEqual('toggle');
  });
});
