import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CONSTANTES } from '../../constants';
import { TenenciasDolarMep } from '../../models/tenencias';

@Component({
  selector: 'ftya-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss']
})
export class CardDashboardComponent implements OnInit {

  @Input() textoTitulo: string;
  @Input() textoInfo?: string;
  @Input() textoTooltip?: string;
  @Input() textoBoton?: string;
  @Input() textoVacio?: string;
  @Input() nroPaso?: number;
  @Input() tenencia?: TenenciasDolarMep;
  @Input() ventaEfectuada?: boolean;
  @Input() textoTooltipTitulo?: string;
  @Input() tieneCotizacion?: boolean;
  @Output() accionBoton = new EventEmitter<void>();
  @Output() accionIcono = new EventEmitter<void>();
  textosCard = CONSTANTES.PAGINA.HOME_DOLAR_MEP.PASOS;
  cantidadParking: number;
  valorEstimadoParking: number;
  simboloParking: string;
  cantidadDisponible: number;
  valorEstimadoDisponible: number;
  simboloDisponible: string;
  cargaDatos: boolean;
  recargaTenencia: boolean;

  ngOnInit(): void {
    this.inicializarValoresParking();
    this.inicializarValoresDisponible();
    this.cargaDatos = true;
    this.recargaTenencia = false;
  }

  inicializarValoresParking() {
    try {
      this.cantidadParking = this.tenencia?.parking.cantidad_nominales;
      this.valorEstimadoParking = this.tenencia?.parking.monto.monto;
      this.simboloParking = this.tenencia?.parking.monto.moneda.simbolo;
    } catch (error) {
      this.cantidadParking = null;
      this.valorEstimadoParking = null;
      this.simboloParking = null;
    }
  }

  inicializarValoresDisponible() {
    try {
      this.cantidadDisponible = this.tenencia?.disponible.cantidad_nominales;
      this.valorEstimadoDisponible = this.tenencia?.disponible.monto.monto;
      this.simboloDisponible = this.tenencia?.disponible.monto.moneda.simbolo;
    } catch (error) {
      this.cantidadParking = null;
      this.valorEstimadoDisponible = null;
      this.simboloDisponible = null;
    }
  }

  clickBoton() {
    this.accionBoton.emit();
  }

  async clickIcono() {
    this.cargaDatos = false;
    this.recargaTenencia = true;
    await Promise.resolve(this.accionIcono.emit())
      .then(() => this.inicializarValoresParking());
  }
}
