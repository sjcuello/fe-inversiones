import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CONSTANTES } from '../../constants';
import { Modal } from '../../models/modal';

@Component({
  selector: 'ftya-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  textosBoton = CONSTANTES.GENERICO;
  infoModal: Modal;
  muestraCancelar: boolean;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: Modal
  ) {
    this.infoModal = data;
    this.muestraCancelar = data.muestraCancelar;
  }

  cerrarModal(accion: boolean) {
    this.dialogRef.close(accion);
  }
}
