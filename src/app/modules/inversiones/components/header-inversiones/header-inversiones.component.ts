import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, SimpleChanges, ChangeDetectorRef, OnChanges, AfterViewInit } from '@angular/core';
import { CONSTANTES } from '../../constants';
import { FocusMonitor } from '@angular/cdk/a11y';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ftya-header',
  templateUrl: './header-inversiones.component.html',
  styleUrls: ['./header-inversiones.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-out', style({ opacity: 0 })),
      ])
    ]),
  ]
})
export class HeaderInversionesComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild('botonVolver', { static: false }) botonVolver: ElementRef;

  @Input() puedeVolver = true;
  @Input() titulo = '';
  @Output() accionVolver = new EventEmitter<any>();

  readonly volverTxt = CONSTANTES.GENERICO.VOLVER;

  constructor(private focusMonitor: FocusMonitor,
              private changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    if (this.puedeVolver) {
      this.focusMonitor.monitor(this.botonVolver).subscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.changeDetector.detectChanges();

    if (changes.puedeVolver && changes.puedeVolver.currentValue) {
      this.focusMonitor.monitor(this.botonVolver).subscribe();
    } else {
      this.focusMonitor.stopMonitoring(this.botonVolver);
    }
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.botonVolver);
  }

  navegar() {
    this.accionVolver.emit();
  }
}
