import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.scss',
  ]
})
export class FooterComponent implements OnInit {

  ultimoLogin: Date;

  ngOnInit(): void {
    this.getDatosFooter();
  }

  getDatosFooter() {
    const cliente: Cliente = JSON.parse(sessionStorage.getItem('cliente'));
    this.ultimoLogin = cliente?.ultimo_login;
  }
}
