import { TestBed } from '@angular/core/testing';
import { DeviceDetectorService } from './device-detector.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

describe('DeviceDetectorService', () => {
  let service: DeviceDetectorService;

  const matchObj = [
    { matchStr: '(max-width: 411px)', result: true },
    { matchStr: '(max-width: 600px)', result: true },
    { matchStr: '(max-width: 767px)', result: false },
    { matchStr: '(min-width: 768px)', result: true },
  ];
  const fakeObserve = (s: string[]): Observable<BreakpointState> =>
    from(matchObj).pipe(
      filter(match => match.matchStr === s[0]),
      map(match => ({ matches: match.result, breakpoints: {} })),
    );

  const mockBreakpointObserver = {
    observe: jest.fn(() => fakeObserve),
    isMatched: jest.fn(() => true),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeviceDetectorService,
        { provide: BreakpointObserver, useValue: mockBreakpointObserver }
      ]
    });
    service = TestBed.inject(DeviceDetectorService);
  });

  it('Debería crear el componente', () => {
    expect(service).toBeTruthy();
  });

  it('Debería retornar si es isSmallScreen', () => {
    const actual = service.isSmallScreen();
    expect(actual).toBeTruthy();
  });

  it('Debería retornar si es isMobileScreen', () => {
    const actual = service.isMobileScreen();
    expect(actual).toBeTruthy();
  });

  it('Debería retornar si es isMediumScreen', () => {
    const actual = service.isMediumScreen();
    expect(actual).toBeTruthy();
  });

  it('Debería retornar si es isDesktopScreen', () => {
    const actual = service.isDesktopScreen();
    expect(actual).toBeTruthy();
  });
});
