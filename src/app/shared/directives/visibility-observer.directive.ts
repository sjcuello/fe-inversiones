import { Directive, Input, OnInit, OnDestroy, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[shared-visibility-observer]'
})
export class VisibilityObserverDirective implements OnInit, OnDestroy {

  @Input() visibilityRootMargin = '0px';
  @Input() visibilityRoot: HTMLElement;
  @Input() visibilityThreshold: number | number[];

  @Output() visibilityChange = new EventEmitter<void>();

  private intersectionObserver: IntersectionObserver;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {

    const config = {
      root: this.visibilityRoot,
      rootMargin: this.visibilityRootMargin,
      threshold: this.visibilityThreshold
    };

    try {
      this.intersectionObserver = new IntersectionObserver((entries, observer) => this.intersectionChanged(entries, observer), config);
      this.intersectionObserver.observe(this.element.nativeElement);
    } catch (e) {
      // ignorado: el browser no tiene soporte para IntersectionObserver
    }
  }

  private intersectionChanged(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void  {

    try {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.visibilityChange.emit();
          observer.unobserve(entry.target);
        }
      });
    } catch (e) {
      // ignorado: el browser no tiene soporte para IntersectionObserver
    }
  }

  ngOnDestroy() {

    this.intersectionObserver?.disconnect();
  }
}
