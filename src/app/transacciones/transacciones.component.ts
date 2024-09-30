import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/service';
import { Fondo } from '../model/fondo.model';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {
  transacciones: any[] = [];
  fondos: Fondo[] = [];

  constructor(private clientService: ClientService, private http: HttpClient) { }

  ngOnInit() {
    const identificacion = this.clientService.identificacion;
    this.fondos = this.clientService.getFondos();
    this.obtenerTransacciones(identificacion);
  }

  obtenerTransacciones(clienteId: string) {
    const url = `http://localhost:8080/api/transaccion/cliente/${clienteId}/history-transacciones`;
    this.http.get(url).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.transacciones = response.data.map((transaccion: any) => {
            const fondo = this.fondos.find(f => f.id === transaccion.fondoId);
            return {
              ...transaccion,
              nombreFondo: fondo ? fondo.nombre : 'Fondo desconocido'
            };
          });
        }
      },
      (error: any) => {}
    );
  }
}
