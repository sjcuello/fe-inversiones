import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactividadDialogComponent } from './inactividad-dialog.component';
import { AngularMaterialModule } from '../../../angular-material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InactividadDialogComponent', () => {
  let component: InactividadDialogComponent;
  let fixture: ComponentFixture<InactividadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InactividadDialogComponent],
      imports: [AngularMaterialModule, HttpClientTestingModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactividadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
