import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nombreCliente: string = '';
  saldo: number = 0;
  identificacion: string = '';

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit() {

    this.nombreCliente = this.clientService.nombreCliente;
    this.saldo = this.clientService.saldo;
    this.identificacion = this.clientService.identificacion;

    this.clientService.clientDataChanged.subscribe(data => {
      this.nombreCliente = data.nombre;
      this.saldo = data.saldo;
      this.identificacion = data.identificacion;
    });
  }
  logout() {

    this.router.navigate(['/login']);
  }
}
