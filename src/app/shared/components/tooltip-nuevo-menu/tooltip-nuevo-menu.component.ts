import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../core/services/cliente.service';
import { Cliente, Preferencias } from '../../models/cliente';

@Component({
  selector: 'shared-tooltip-nuevo-menu',
  templateUrl: './tooltip-nuevo-menu.component.html',
  styleUrls: [
    './tooltip-nuevo-menu.component.scss'
  ]
})
export class TooltipNuevoMenuComponent implements OnInit {
  isHidden = true;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    const cliente: Cliente = JSON.parse(sessionStorage.getItem('cliente'));
    this.isHidden = cliente.preferencias.vio_menu;
  }

  changeStatus(isOpen: boolean): void {
    this.isHidden = !isOpen;

    const pref: Preferencias = {
      vio_menu: true
    };
    this.clienteService.updatePreferencias(pref);
  }
}
