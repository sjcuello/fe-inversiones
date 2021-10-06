import { VisibilityObserverDirective } from './visibility-observer.directive';
import { ElementRef } from '@angular/core';

describe('IntersectionObserverDirective', () => {
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('div'));
  });

  it('should create an instance', () => {
    const directive = new VisibilityObserverDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
