import { CdkStepper } from '@angular/cdk/stepper';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StepperOnboardingComponent } from 'src/app/modules/inversiones/components/stepper-onboarding/stepper-onboarding.component';
import { Pais } from 'src/app/modules/inversiones/models/paises';
import { StepperComponent } from '../../../../../../modules/inversiones/components/stepper/stepper.component';
import { SharedModule } from '../../../../../../shared/shared.module';

import { OnboardingComponent } from './onboarding.component';

describe('OnboardingComponent', () => {
    let component: OnboardingComponent;
    let fixture: ComponentFixture<OnboardingComponent>;
    let mockPaises: Pais[];

    beforeEach(async(() => {
        const mockJwtHelperService = {
            getTokenExpirationDate: jest.fn()
        };

        mockPaises = [
            {
                "codigo": 0,
                "nombre": "Argentina"
            },
            {
                "codigo": 1,
                "nombre": "Uruguay"
            },
            {
                "codigo": 2,
                "nombre": "Chile"
            },
            {
                "codigo": 3,
                "nombre": "Bolivia"
            }
        ];

        TestBed.configureTestingModule({
            declarations: [OnboardingComponent, StepperComponent, StepperOnboardingComponent],
            imports: [
                HttpClientTestingModule,
                SharedModule,
                BrowserAnimationsModule,
                RouterTestingModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: CdkStepper, useExisting: StepperComponent },
                { provide: CdkStepper, useExisting: StepperOnboardingComponent },
                { provide: JwtHelperService, useValue: mockJwtHelperService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OnboardingComponent);
        component = fixture.componentInstance;
        component.primerPanel = false;
        component.segundoPanel = false;
        component.tercerPanel = false;
        component.entroStepper = false;
        component.activarValidaciones = false;
        component.stepActual = 0;
        component.listaPaises = mockPaises;
        component.terminosSPV = 'string';
        fixture.detectChanges();
    });

    it('Debe crear el componente', () => {
        expect(component).toBeTruthy();
    });

    it('Se cambia estado de Primer panel', () => {
        component.cambiaEstadoPanel(true, 1);
        expect(component.primerPanel).toEqual(true);
        expect(component.segundoPanel).toEqual(false);
        expect(component.tercerPanel).toEqual(false);
    });

    it('Se cambia estado de Segundo panel', () => {
        component.cambiaEstadoPanel(true, 2);
        expect(component.primerPanel).toEqual(false);
        expect(component.segundoPanel).toEqual(true);
        expect(component.tercerPanel).toEqual(false);
    });

    it('Se cambia estado de Tercer panel', () => {
        component.cambiaEstadoPanel(true, 3);
        expect(component.primerPanel).toEqual(false);
        expect(component.segundoPanel).toEqual(false);
        expect(component.tercerPanel).toEqual(true);
    });

    it('Se debe retroceder en una posición en el stepper del onboardig', () => {
        component.stepActual = 1;
        fixture.detectChanges();
        component.irAlPasoAnteriorOnboarding();
        expect(component.stepActual).toEqual(0);
    });

    it('Se valida si la etapa parametrizada es diferente a la etapa corriente del stepper del onboarding', () => {
        component.stepActual = 1;
        fixture.detectChanges();
        expect(component.validaStep(2)).toBeFalsy();
    });

    it('Se valida si la etapa parametrizada es igual a la etapa corriente del stepper del onboarding', () => {
        component.stepActual = 1;
        fixture.detectChanges();
        expect(component.validaStep(1)).toBeTruthy();
    });

    it('Se deben activar las validaciones del formulario para la sección "Actividad y residencia"', () => {
        component.confirmacionActividResidencia();
        expect(component.activarValidaciones).toBeTruthy();
    });

    it('Se debe cargar el nombre del cliente desde el token', () => {
        var name = JSON.parse(sessionStorage.getItem('cliente'))?.nombre;
        expect(component.nombre).toBe(name);
    });

    it('Deben setearse los paises desde el endpoint de los paises', () => {
        component.getPaises();
        fixture.detectChanges();
        expect(component.listaPaises).toBe(mockPaises);
    });

    it('Deben setearse los terminos y condiciones ', () => {
        const ttcc = 'spv';
        const respuesta = 'string';
        component.getTerminosCondiciones(ttcc);
        fixture.detectChanges();
        expect(component.terminosSPV).toBe(respuesta);
    });
});
