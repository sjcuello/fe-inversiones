import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionExpiradaDialogComponent } from './session-expirada-dialog.component';

describe('SessionExpiradaDialogComponent', () => {
  let component: SessionExpiradaDialogComponent;
  let fixture: ComponentFixture<SessionExpiradaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionExpiradaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionExpiradaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
