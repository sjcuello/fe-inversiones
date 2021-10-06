import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Cuenta } from '../../../../shared/models/cuenta';
import { DetalleVentas } from '../../models/detalle-ventas';
import { Monto } from '../../models/tenencias';
import { ModalComponent } from '../modal/modal.component';
import { CONSTANTES } from '../../constants';

@Component({
  selector: 'ftya-detalle-confirmacion',
  templateUrl: './detalle-confirmacion.component.html',
  styleUrls: ['./detalle-confirmacion.component.scss']
})
export class DetalleConfirmacionComponent implements OnInit {

  @Input() textoConfirmacion: any;
  @Input() numeroCuentaDolares: Cuenta;
  @Input() numeroCuentaPesos: Cuenta;
  @Input() detalleVenta: DetalleVentas;
  @Output() accionCheckbox: EventEmitter<boolean> = new EventEmitter<boolean>();
  venta: Monto;
  comisionVenta: Monto;
  credito: Monto;
  derechosMercado: Monto;
  panelOpenState = false;
  form: FormGroup;
  datosDDJJ = CONSTANTES.PAGINA.DECLARACION_JURADA;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private builder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.matIconRegistry.addSvgIcon('icon-tooltip',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/icon-tooltip.svg'));
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      terms: [false, Validators.requiredTrue]
    });
    this.inicializaDetalle();
  }

  tildaCheckbox() {
    this.accionCheckbox.emit(this.form.get('terms').value);
  }

  inicializaDetalle() {
    if (this.detalleVenta) {
      this.venta = this.detalleVenta.estimados.venta;
      this.comisionVenta = this.detalleVenta.estimados.comision_venta;
      this.credito = this.detalleVenta.estimados.credito;
      this.derechosMercado = this.detalleVenta.estimados.derechos_mercado;
    }
  }

  get tildado() {
    return this.form.get('terms').value;
  }

  abrirModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: this.datosDDJJ.ANCHO,
      height: this.datosDDJJ.ALTO,
      disableClose: true,
      data: {
        titulo: this.datosDDJJ.TITULO,
        contenido: this.datosDDJJ.CONTENIDO,
      }
    });

    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        this.form.get('terms').setValue(respuesta);
        this.tildaCheckbox();
      }
    });
  }
}
