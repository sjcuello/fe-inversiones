import { CdkStepper } from '@angular/cdk/stepper';
import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cuenta } from '../../../../../inversiones/models/cuenta';
import { DescripcionMoneda } from '../../../../../../shared/models/moneda';
import { NumeroDecimalPipe } from '../../../../../../shared/pipes/numero-decimal.pipe';
import { CONSTANTES } from '../../../../constants';
import { Route } from '../../../../enums/route-enum';
import { InversionesService } from '../../../../services/inversiones.service';
import { DetalleCompras } from 'src/app/modules/inversiones/models/detalle-compras';

@Component({
  selector: 'ftya-compra-dolar-mep',
  templateUrl: './compra-dolar-mep.component.html',
  styleUrls: ['./compra-dolar-mep.component.scss']
})
export class CompraDolarMepComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper: CdkStepper;

  textosCompraDolarMep = CONSTANTES.PAGINA.COMPRA_DOLAR_MEP;
  textoBoton = CONSTANTES.GENERICO.CONTINUAR;
  textoConfirmar = CONSTANTES.GENERICO.CONFIRMAR;
  textoCancelar = CONSTANTES.GENERICO.CANCELAR;
  textosError = CONSTANTES.ERROR;
  subtituloError: string;
  tituloPaso = this.textosCompraDolarMep.PRIMER_PASO;
  textosDetalleConfirmacion = CONSTANTES.PAGINA.COMPRA_DOLAR_MEP.DETALLE_SOLICITUD;
  cuentasEnPesos: Cuenta[];
  cuentaPredeterminada: Cuenta;
  cuentaSeleccionada: Cuenta;
  estaCargandoCuentas: boolean;
  tieneErrorCuentas: boolean;
  estaCargandoCotizaciones: boolean;
  estaCargandoDetalle: boolean;
  mostrarErrorPantallaCompleta: boolean;
  estaCargandoCompras: boolean;
  compraExitosa: boolean;
  deshabilitarContinuar: boolean;
  resetearMonto: boolean;
  precioCompraDolarMep: number;
  montoMaximo: number;
  montoMinimo: number;
  montoElegido: number;
  dolaresAComprar = 0;
  estadoPanel: boolean;
  subscriptions: Subscription = new Subscription();
  detalleCompra: DetalleCompras;
  readonly titulo = this.textosCompraDolarMep.TITULO;

  constructor(private inversionesService: InversionesService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private numeroDecimal: NumeroDecimalPipe,
              private decimalPipe: DecimalPipe,
              private router: Router
  ) {
    this.matIconRegistry.addSvgIcon(
      'icon-danger',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/icon-badge-danger.svg')
    );
  }

  ngOnInit(): void {
    this.getCotizaciones();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getCuentas() {
    this.subscriptions.add(this.inversionesService.getCuentas().subscribe(
      response => {
        this.cuentasEnPesos = response.cuentas.filter(cuenta => cuenta.moneda.descripcion === DescripcionMoneda.Pesos);

        this.cuentaPredeterminada = this.cuentasEnPesos[0];
        this.deshabilitarContinuar = this.cuentaPredeterminada.saldo < this.precioCompraDolarMep;
        this.cuentaSeleccionada = this.cuentaPredeterminada;
        this.montoMaximo = this.cuentaSeleccionada.saldo;

        this.estaCargandoCuentas = false;
        this.tieneErrorCuentas = false;
      },
      error => {
        this.estaCargandoCuentas = false;
        this.tieneErrorCuentas = true;
        this.deshabilitarContinuar = true;
      }
    ));
  }

  getCotizaciones() {
    this.estaCargandoCotizaciones = true;
    this.estaCargandoCuentas = true;
    this.estadoPanel = false;
    this.subscriptions.add(this.inversionesService.getCotizaciones().subscribe(
      response => {
        this.estaCargandoCotizaciones = false;
        this.mostrarErrorPantallaCompleta = false;
        const { precioCompra } = this.inversionesService.calcularCotizacionDolarMep(response);

        this.montoMinimo = precioCompra;
        this.precioCompraDolarMep = precioCompra;
        this.getCuentas();
      },
      error => {
        this.estaCargandoCotizaciones = false;
        this.mostrarErrorPantallaCompleta = true;
        this.subtituloError = this.textosError.SUBTITULO.COTIZACIONES;
      }
    ));
  }

  irAlPasoSiguiente() {
    this.stepper.next();
  }

  getDetalleCompra() {
    this.estaCargandoDetalle = true;
    this.subscriptions.add(this.inversionesService.getDetalleCompra(this.montoElegido).subscribe(
      response => {
        this.estaCargandoDetalle = false;
        this.detalleCompra = response;
        this.irAlPasoSiguiente();
      },
      error => {
        this.detalleCompra = null;
        this.mostrarErrorPantallaCompleta = true;
      }
    ));
  }

  get condicionDetalleCompra() {
    return this.detalleCompra && this.cuentaSeleccionada && !this.deshabilitarContinuar;
  }

  volverPasoAnterior() {
    this.estadoPanel = false;
    this.stepper?.selectedIndex ? this.stepper.previous() : this.router.navigate([Route.HomeDolarMep]);
  }

  seleccionarCuenta(cuenta: string) {
    const cuentaSeleccionada = this.cuentasEnPesos.find(c => c.identificador === cuenta);
    this.montoMaximo = cuentaSeleccionada.saldo;
    this.cuentaSeleccionada = cuentaSeleccionada;
    this.deshabilitarContinuar = cuentaSeleccionada.saldo < this.precioCompraDolarMep;
  }

  calcularDolares(monto: number) {
    if (monto) {
      this.dolaresAComprar = monto / this.precioCompraDolarMep;
      this.montoElegido = monto;
      this.deshabilitarContinuar = this.cuentaSeleccionada.saldo < monto || this.precioCompraDolarMep > monto;
    }
  }

  cambiaEstadoPanel(event: boolean) {
    this.estadoPanel = event;
  }

  confirmacionModal(event: boolean) {
    if (event) {
      this.postCompraDolarMep();
    }
  }

  cerrar() {
    this.router.navigate([Route.HomeDolarMep]);
  }

  postCompraDolarMep() {
    this.estaCargandoCompras = true;
    const body = { monto: this.montoElegido, identificador_cuenta_origen: this.cuentaSeleccionada.identificador };
    this.subscriptions.add(this.inversionesService.postCompraDolarMep(body).subscribe(
      response => {
        this.estaCargandoCompras = false;
        this.mostrarErrorPantallaCompleta = false;
        this.compraExitosa = true;
      },
      error => {
        this.estaCargandoCompras = false;
        this.mostrarErrorPantallaCompleta = true;
        this.compraExitosa = false;
        this.subtituloError = this.textosError.SUBTITULO.COMPRA;
      }
    ));
  }
}
