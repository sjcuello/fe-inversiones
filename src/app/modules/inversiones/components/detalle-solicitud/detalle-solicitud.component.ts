import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Cuenta } from 'src/app/shared/models/cuenta';
import { CONSTANTES } from '../../constants';
import { DetalleCompras } from '../../models/detalle-compras';
import { Monto } from '../../models/tenencias';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'ftya-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.scss']
})
export class DetalleSolicitudComponent implements OnInit {

  @Input() textoConfirmacion: any;
  @Input() numeroCuenta: Cuenta;
  @Input() detalleCompra: DetalleCompras;
  @Input() dolaresAComprar: number;
  @Input() panelAbierto: boolean;
  @Output() estadoActualPanel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cerroModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  venta: Monto;
  comisionVenta: Monto;
  credito: Monto;
  derechosMercado: Monto;
  detalleInversion: Monto;
  detalleComisionCompra: Monto;
  detalleDerechosMercado: Monto;
  detalleCotizacionDolarMep: Monto;
  detalleCompraEstimada: Monto;
  detallePesosEstimado: Monto;
  datosRROO = CONSTANTES.PAGINA.REQUISITOS_OPERACION;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    this.matIconRegistry.addSvgIcon('icon-tooltip',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/icon-tooltip.svg'));
  }

  ngOnInit(): void {
    this.inicializaDetalle();
  }

  inicializaDetalle() {
    if (this.detalleCompra) {
      this.detalleInversion = this.detalleCompra.inversion;
      this.detalleComisionCompra = this.detalleCompra.comision_compra;
      this.detalleDerechosMercado = this.detalleCompra.derechos_mercado;
      this.detalleCotizacionDolarMep = this.detalleCompra.cotizacion_dolar_mep;
      this.detalleCompraEstimada = this.detalleCompra.compra_estimada;
      this.detallePesosEstimado = this.detalleCompra.dinero_operacion;
    }
  }

  cambiaEstadoPanel(estado: boolean) {
    this.panelAbierto = estado;
    this.estadoActualPanel.emit(this.panelAbierto);
  }

  abrirModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: this.datosRROO.ANCHO,
      height: this.datosRROO.ALTO,
      disableClose: true,
      data: {
        titulo: this.datosRROO.TITULO,
        contenido: this.datosRROO.CONTENIDO,
      }
    });

    dialogRef.afterClosed().subscribe(respuesta => {
      this.cerroModal.emit(respuesta);
    });
  }
}
