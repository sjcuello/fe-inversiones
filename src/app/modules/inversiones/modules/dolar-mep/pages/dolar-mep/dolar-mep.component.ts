import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CONSTANTES } from 'src/app/modules/inversiones/constants';
import { Route } from 'src/app/modules/inversiones/enums/route-enum';
import { TenenciasDolarMep } from 'src/app/modules/inversiones/models/tenencias';
import { InversionesService } from 'src/app/modules/inversiones/services/inversiones.service';
import { saveAs } from 'file-saver';
import { CardDashboardComponent } from 'src/app/modules/inversiones/components/card-dashboard/card-dashboard.component';
@Component({
  selector: 'ftya-dolar-mep',
  templateUrl: './dolar-mep.component.html',
  styleUrls: ['./dolar-mep.component.scss']
})
export class DolarMepComponent implements OnInit, AfterViewInit {
  @ViewChildren(CardDashboardComponent) childrenComponents: QueryList<CardDashboardComponent>;
  cardParking: CardDashboardComponent;
  estaCargandoCotizaciones: boolean;
  tieneErrorCotizaciones: boolean;
  precioCompraDolarMep: number;
  textosHomeDolarMep = CONSTANTES.PAGINA.HOME_DOLAR_MEP;
  subscriptions: Subscription = new Subscription();
  tenencia: TenenciasDolarMep;
  consultaTenencia: boolean;
  ventaEfectuada: boolean;
  tooltipParking: string;
  tooltipEspera: string;
  textoInfoParking: string;
  constructor(
    private inversionesService: InversionesService,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private router: Router) {
    this.matIconRegistry.addSvgIcon('icon-tooltip',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/icon-tooltip.svg')
    );
    this.matIconRegistry.addSvgIcon('icon-restart',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/icon-restart.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'separator',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/separator.svg')
    );
  }

  ngOnInit(): void {
    this.getCotizaciones();
    this.getTenenciasDolarMep();
    this.ventaEfectuada = history.state?.venta;
  }

  ngAfterViewInit() {
    const nroPaso = this.textosHomeDolarMep.PASOS.SEGUNDO.PASO;
    this.childrenComponents.changes.subscribe((cards: Array<CardDashboardComponent>) => {
      this.cardParking = cards.find(card => card.nroPaso === nroPaso);
    });
  }

  getCotizaciones() {
    this.estaCargandoCotizaciones = true;
    this.subscriptions.add(this.inversionesService.getCotizaciones().subscribe(
      response => {
        this.estaCargandoCotizaciones = false;
        this.tieneErrorCotizaciones = false;
        this.precioCompraDolarMep = this.inversionesService.calcularCotizacionDolarMep(response).precioCompra;
      },
      error => {
        this.estaCargandoCotizaciones = false;
        this.tieneErrorCotizaciones = true;
      }
    ));
  }

  getTenenciasDolarMep() {
    this.subscriptions.add(this.inversionesService.getTenenciasDolarMep().subscribe(
      (response: TenenciasDolarMep) => {
        this.tenencia = response;
        this.consultaTenencia = true;
        this.tooltipEspera = this.textosHomeDolarMep.PASOS.SEGUNDO.TOOLTIP_PARKING;
        this.textoInfoParking = this.textosHomeDolarMep.PASOS.SEGUNDO.TENENCIA;
        if (this.tenencia && Object.keys(this.tenencia).length) {
          if (this.noCompro) {
            this.tooltipParking = this.textosHomeDolarMep.PASOS.SEGUNDO.TOOLTIP;
            this.tooltipEspera = null;
          }
          if (!this.tieneParking && this.tieneNominales) {
            this.tooltipParking = this.textosHomeDolarMep.PASOS.SEGUNDO.TOOLTIP_SIN_TENENCIA;
            this.tooltipEspera = null;
          }
          this.textoInfoParking = this.textosHomeDolarMep.PASOS.SEGUNDO.INFO;
        }
        if (this.cardParking) {
          this.cardParking.recargaTenencia = false;
        }
      },
      error => {
        this.consultaTenencia = true;
        this.tenencia = null;
      }
    ));
  }

  navegarCompra() {
    this.router.navigate([Route.CompraDolarMep]);
  }

  navegarVenta() {
    this.router.navigate([Route.VentaDolarMep]);
  }

  async downloadPdf() {
    const urlPath = 'assets/files/ttcc-prueba.pdf';
    const nombreArchivo = 'Términos y condiciones.pdf';
    saveAs(urlPath, nombreArchivo);
  }

  get tieneParking() {
    return this.tenencia.parking.cantidad_nominales !== 0;
  }

  get tieneNominales() {
    return this.tenencia.disponible.cantidad_nominales !== 0;
  }

  get noCompro() {
    return !this.tieneParking && !this.tieneNominales;
  }
}
