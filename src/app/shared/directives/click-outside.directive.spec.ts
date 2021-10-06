import { ClickOutsideDirective } from './click-outside.directive';
import { ElementRef } from '@angular/core';

describe('ClickOutsideDirectiveDirective', () => {
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('div'));
  });

  it('should create an instance', () => {
    const directive = new ClickOutsideDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});

