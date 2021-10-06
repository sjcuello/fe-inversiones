import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/shared/models/cliente';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modules/inversiones/components/modal/modal.component';
import { InstanciaIconosService } from 'src/app/modules/inversiones/providers/instancia-iconos.service';
import { CONSTANTES } from '../../../../constants';
import { Subscription } from 'rxjs';
import { InversionesService } from 'src/app/modules/inversiones/services/inversiones.service';
import { Pais } from 'src/app/modules/inversiones/models/paises';
@Component({
  selector: 'ftya-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  @ViewChild('stepper') stepper: CdkStepper;
  @ViewChild('stepperOnboarding') stepperOnboarding: CdkStepper;

  subscriptions: Subscription = new Subscription();
  form: FormGroup;
  textosOnboarding = CONSTANTES.ONBOARDING;
  primerPanel: boolean;
  segundoPanel: boolean;
  tercerPanel: boolean;
  maxCantidadCaracteres: boolean;
  entroStepper = false;
  activarValidaciones = false;
  stepActual = 0;
  nombre: string;
  listaPaises: Pais[];
  terminosSPV: string;
  terminosIOL: string;

  listaLaboral = [
    { valor: 'Relación de dependencia', valorVista: 'Relación de dependencia' },
    { valor: 'Monotributista', valorVista: 'Monotributista' },
    { valor: 'Autónomo', valorVista: 'Autónomo' },
    { valor: 'Jubilado', valorVista: 'Jubilado' },
    { valor: 'Rentista', valorVista: 'Rentista' },
    { valor: 'Estudiante', valorVista: 'Estudiante' },
    { valor: 'Ama de casa', valorVista: 'Ama de casa' },
    { valor: 'Desocupado', valorVista: 'Desocupado' }
  ];

  icons = [
    'icon-tooltip-square', 'icon-link-redirect', 'icon-alert-red',
    'icon-contact-confirmation', 'icon-investor-profile', 'icon-investor-profile-hide',
    'icon-work-activity-hide', 'icon-work-activity'
  ];

  constructor(
    private builder: FormBuilder,
    public dialog: MatDialog,
    private instanciaIconos: InstanciaIconosService,
    private inversionesService: InversionesService,
  ) {

    const cliente: Cliente = JSON.parse(sessionStorage.getItem('cliente'));
    this.nombre = cliente?.nombre;
    instanciaIconos.inicializaIconos(this.icons);
    this.creacionFormularios();
  }

  ngOnInit() {
    this.getPaises();
    this.getTerminosCondiciones(this.textosOnboarding.MODALES.TTCC_SPV);
    this.getTerminosCondiciones(this.textosOnboarding.MODALES.TTCC_IOL);
  }

  getPaises() {
    this.subscriptions.add(this.inversionesService.getPaises().subscribe(
      response => {
        this.listaPaises = response;
      },
      error => {
        this.listaPaises = [];
      }
    ));
  }

  getTerminosCondiciones(termino: string) {
    this.inversionesService.getTerminosCondiciones(termino).subscribe(
      response => {
        if (this.textosOnboarding.MODALES.TTCC_SPV === termino) {
          this.terminosSPV = response.texto;
        } else {
          this.terminosIOL = response.texto;
        }
      }
    );
  }

  creacionFormularios() {
    this.form = this.builder.group({
      terminos_1: [false, Validators.requiredTrue],
      terminos_2: [false, Validators.requiredTrue],
      toggle_1: [false],
      toggle_2: [false],
      toggle_3: [false],
      actividad_laboral: [null, Validators.required],
      motivo_expuesto: [null],
      certificado_cargado: [null],
      pais_recidencia: [null],
      direccion: [null],
      ciudad: [null],
      estado: [null],
      codigo_postal: [null],
      nro_identificacion: [null],
      ciudadania: [null],
    });

    this.form.get('toggle_1').valueChanges
      .subscribe(value => {
        this.form.get('motivo_expuesto').setValidators([Validators.maxLength(60), this.requeridoCondicional(value)]);
        this.form.get('motivo_expuesto').updateValueAndValidity();
      }
      );

    this.form.get('toggle_2').valueChanges
      .subscribe(value => {
        this.form.get('certificado_cargado').setValidators(this.requeridoCondicional(value));
      }
      );

    this.form.get('toggle_3').valueChanges
      .subscribe(value => {
        this.form.get('pais_recidencia').setValidators(this.requeridoCondicional(value));
        this.form.get('direccion').setValidators(this.requeridoCondicional(value));
        this.form.get('nro_identificacion').setValidators(this.requeridoCondicional(value));
        this.form.get('ciudadania').setValidators(this.requeridoCondicional(value));
        this.form.get('ciudad').setValidators(this.requeridoCondicional(value));
        this.form.get('estado').setValidators(this.requeridoCondicional(value));
        this.form.get('codigo_postal').setValidators(this.requeridoCondicional(value));

        this.form.get('pais_recidencia').updateValueAndValidity();
        this.form.get('direccion').updateValueAndValidity();
        this.form.get('nro_identificacion').updateValueAndValidity();
        this.form.get('ciudadania').updateValueAndValidity();
        this.form.get('ciudad').updateValueAndValidity();
        this.form.get('estado').updateValueAndValidity();
        this.form.get('codigo_postal').updateValueAndValidity();
      }
      );
  }

  requeridoCondicional(condicion: boolean) {
    return condicion ? Validators.required : Validators.nullValidator;
  }

  irAlPasoSiguiente() {
    this.entroStepper = !this.entroStepper;
    this.stepper.next();
  }

  irAHomeInversiones() {
    window.location.href = `/obi/inversiones/home/`;
  }

  reseteaStepper() {
    this.entroStepper = false;
    this.stepActual = 0;
    this.stepper.reset();
  }

  irAlPasoSiguienteOnboarding() {
    this.stepActual++;
    this.stepperOnboarding.next();
  }

  irAlPasoAnteriorOnboarding() {
    this.stepActual--;
    this.stepperOnboarding.previous();
  }

  validaStep(step: number): boolean {
    return this.stepActual === step;
  }

  cambiaEstadoPanel(event, panel) {
    switch (panel) {
      case 1:
        this.primerPanel = event;
        this.form.patchValue({ toggle_1: event });
        break;
      case 2:
        this.segundoPanel = event;
        this.form.patchValue({ toggle_2: event });
        break;
      case 3:
        this.tercerPanel = event;
        this.form.patchValue({ toggle_3: event });
        break;
      default:
        this.primerPanel = this.segundoPanel = this.tercerPanel = event;
        break;
    }
    this.resetearFormulario(event, panel);
  }

  abrirModal(titulo, contenido) {
    this.dialog.open(ModalComponent, {
      width: this.textosOnboarding.MODALES.ANCHO,
      height: this.textosOnboarding.MODALES.ALTO,
      disableClose: true,
      data: {
        titulo,
        contenido,
        muestraCancelar: false
      }
    });
  }

  validaErrores(nombreControl: string): boolean {
    return this.form.get(nombreControl).errors && this.activarValidaciones;
  }

  validaErroresSeleccionoado(nombreControl: string): boolean {
    return this.form.get(nombreControl).errors && this.form.get(nombreControl).touched;
  }

  tieneErrorSeleccionadoValidado(nombreControl: string): boolean {
    return this.validaErrores(nombreControl) || this.validaErroresSeleccionoado(nombreControl);
  }


  resetearFormulario(abierto, panel) {
    if (!abierto) {
      switch (panel) {
        case 1:
          this.form.patchValue({ motivo_expuesto: null });
          break;
        case 2:
          this.form.patchValue({ certificado_cargado: null });
          break;
        case 3:
          this.form.patchValue({ pais_recidencia: null });
          this.form.patchValue({ direccion: null });
          this.form.patchValue({ nro_identificacion: null });
          this.form.patchValue({ ciudadania: null });
          break;
        default:
          break;
      }
    }

  }

  confirmacionActividResidencia() {
    this.activarValidaciones = true;
    if (this.form.valid) {
      const body = {
        fatca: {
          pais_ciudadania: this.form.get('ciudadania').value,
          residencia: {
            pais: this.form.get('pais_recidencia').value,
            direccion: this.form.get('direccion').value,
            ciudad: this.form.get('ciudad').value,
            estado: this.form.get('estado').value,
            cp: this.form.get('codigo_postal').value
          },
          numero_tributario: this.form.get('nro_identificacion').value
        },
        pep: {
          motivo: this.form.get('motivo_expuesto').value
        },
        actividad_laboral: this.form.get('actividad_laboral').value,
        aceptacion_tyc_iol: this.form.get('terminos_1').value,
        aceptacion_tyc_spv: this.form.get('terminos_2').value,
        telefono: ''
      };
      // let formData = new FormData();
      // formData.append('dataSheet', JSON.stringify(body));

      this.subscriptions.add(this.inversionesService.postOnboarding(body).subscribe(
        (response) => {
          this.irAlPasoSiguiente();
        },
        error => {
          /** Pantalla de error cuando UX/UI la libere */
        }
      ));
    }
  }

}
