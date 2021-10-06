import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cuenta } from '../../../../../inversiones/models/cuenta';
import { InversionesService } from '../../../../../inversiones/services/inversiones.service';
import { DescripcionMoneda } from '../../../../../../shared/models/moneda';
import { CONSTANTES } from '../../../../constants';
import { Route } from '../../../../enums/route-enum';
import { DetalleVentas } from 'src/app/modules/inversiones/models/detalle-ventas';

@Component({
  selector: 'ftya-venta-dolar-mep',
  templateUrl: './venta-dolar-mep.component.html',
  styleUrls: ['./venta-dolar-mep.component.scss']
})
export class VentaDolarMepComponent implements OnInit {
  @ViewChild('stepper') stepper: CdkStepper;

  cuentasEnPesos: Cuenta[];
  cuentasEnDolares: Cuenta[];
  estaCargandoCuentas: boolean;
  estaCargandoVenta: boolean;
  tieneErrorCuentas: boolean;
  deshabilitarContinuar: boolean;
  deshabilitarConfirmar: boolean;
  cuentaSeleccionadaDolares: Cuenta;
  cuentaSeleccionadaPesos: Cuenta;
  ventaExitosa: boolean;
  mostrarErrorPantallaCompleta: boolean;
  textosBoton = CONSTANTES.GENERICO;
  textosVentaDolarMep = CONSTANTES.PAGINA.VENTA_DOLAR_MEP;
  textosDetalleConfirmacion = CONSTANTES.PAGINA.VENTA_DOLAR_MEP.DETALLE_CONFIRMACION;
  textosExito = this.textosVentaDolarMep.EXITO;
  textosError = CONSTANTES.ERROR;
  subscriptions: Subscription = new Subscription();
  detalleVenta: DetalleVentas;
  constructor(private router: Router,
              private inversionesService: InversionesService) {
  }

  ngOnInit(): void {
    this.getCuentas();
    this.getDetalleVenta();
  }

  irAlPasoSiguiente() {
    this.stepper.next();
  }

  volverPasoAnterior() {
    this.stepper?.selectedIndex ? this.stepper.previous() : this.volverHome();
  }

  volverHome() {
    this.router.navigate([Route.HomeDolarMep]);
  }

  getCuentas() {
    this.estaCargandoCuentas = true;
    this.deshabilitarConfirmar = true;
    this.subscriptions.add(this.inversionesService.getCuentas().subscribe(
      response => {
        this.cuentasEnPesos = response.cuentas.filter(cuenta => cuenta.moneda.descripcion === DescripcionMoneda.Pesos);
        this.cuentasEnDolares = response.cuentas.filter(cuenta => cuenta.moneda.descripcion === DescripcionMoneda.Dolares);
        this.cuentaSeleccionadaDolares = this.cuentasEnDolares[0];
        this.cuentaSeleccionadaPesos = this.cuentasEnPesos[0];
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

  getDetalleVenta() {
    this.subscriptions.add(this.inversionesService.getDetalleVenta().subscribe(
      (response: DetalleVentas) => {
        this.detalleVenta = response;
      },
      error => {
        this.detalleVenta = null;
      }
    ));
  }

  seleccionarCuentaDolares(identificadorCuenta: string) {
    this.cuentaSeleccionadaDolares = this.cuentasEnDolares.find(c => c.identificador === identificadorCuenta);
  }

  seleccionarCuentaPesos(identificadorCuenta: string) {
    this.cuentaSeleccionadaPesos = this.cuentasEnPesos.find(c => c.identificador === identificadorCuenta);
  }

  validaCheckbox(event: boolean) {
    this.deshabilitarConfirmar = !event;
  }

  cerrar() {
    this.router.navigate([Route.HomeDolarMep], { state: { venta: this.ventaExitosa } });
  }

  postVentaDolarMep() {
    const body = {
      cantidad_nominales: this.detalleVenta.cantidad_nominales_disponibles,
      id_cuenta_credito: this.cuentaSeleccionadaDolares.identificador,
      id_cuenta_debito: this.cuentaSeleccionadaPesos.identificador
    };
    this.estaCargandoVenta = true;
    this.subscriptions.add(this.inversionesService.postVentaDolarMep(body).subscribe(
      (response) => {
        this.ventaExitosa = true;
        this.mostrarErrorPantallaCompleta = false;
        this.estaCargandoVenta = false;
      },
      error => {
        this.ventaExitosa = false;
        this.mostrarErrorPantallaCompleta = true;
      }
    ));
  }
}
