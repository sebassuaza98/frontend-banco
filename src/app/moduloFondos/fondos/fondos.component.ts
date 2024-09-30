import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fondo } from '../../model/fondo.model';
import { Transaccion } from '../../model/transaccion.model';
import { ClientService } from '../../services/service';

@Component({
  selector: 'app-fondos',
  templateUrl: './fondos.component.html',
  styleUrls: ['./fondos.component.css']
})
export class FondosComponent implements OnInit {
  viewFondos: string = 'misFondos';
  misFondos: Transaccion[] = [];
  nuevosFondos: Fondo[] = [];
  fondoSeleccionado: any;
  mostrarFormulario: boolean = false;
  identificacion: string | null = null;
  nuevoSldo: number = 0;
  name: string = '';
  saldo: number = 0;

  constructor(private http: HttpClient, private clientService: ClientService) {
    const clienteData = localStorage.getItem('clienteData');
    if (clienteData) {
      this.identificacion = JSON.parse(clienteData).identificacion;
      this.name = JSON.parse(clienteData).nombre;
    }
  }

  ngOnInit() {
    this.cargarNuevosFondos();
    this.cargarMisTransacciones();
  }

  cargarNuevosFondos() {
    this.http.get<any>(`http://localhost:8080/api/fondos`).subscribe(response => {
      if (response.status === 200) {
        this.nuevosFondos = response.data.map((fondo: Fondo) => ({
          id: fondo.id,
          nombre: fondo.nombre,
          montoMinimo: fondo.montoMinimo,
          categoria: fondo.categoria
        }));
        this.clientService.setFondos(this.nuevosFondos);
      }
    }, error => {});
  }

  cargarMisTransacciones() {
    const clienteId = this.identificacion;
    const tipoTransaccion = 'APERTURA';
    const urlTransacciones = `http://localhost:8080/api/transaccion/cliente/${clienteId}/transacciones?tipo=${tipoTransaccion}`;

    this.http.get<any>(urlTransacciones).subscribe(response => {
      if (response.status === 200) {
        this.misFondos = response.data.map((transaccion: Transaccion) => {
          const fondo = this.nuevosFondos.find(f => f.id === transaccion.fondoId);
          return {
            id: transaccion.id,
            tipo: transaccion.tipo,
            monto: transaccion.monto,
            fondoId: transaccion.fondoId,
            nombreFondo: fondo ? fondo.nombre : 'Fondo desconocido'
          };
        });
      }
    }, error => {});
  }

  cancelTransaction(transaccionId: string, identificacion: string, monto: number) {
    const url = `http://localhost:8080/api/transaccion/cancelar?transaccionId=${transaccionId}&identificacion=${identificacion}`;
    
    this.http.post(url, {}).subscribe(
      response => {
        this.cargarMisTransacciones();
        this.actualizarSaldo();
        this.nuevoSldo = this.saldo + monto;
        this.clientService.setClientData(this.name, this.nuevoSldo, identificacion);
      },
      error => {});
  }

  actualizarSaldo() {
    const identificacion = this.identificacion;

    this.http.get<any>(`http://localhost:8080/api/clientes/filtrar/${identificacion}`).subscribe(
      response => {
        if (response.status === 200) {
          const clienteData = response.data;
          const nuevoSaldos = clienteData.saldo;
          this.saldo = nuevoSaldos;
          this.clientService.setClientData(this.name, nuevoSaldos, identificacion!);
        }
      },
      error => {});
  }

  mostrarFondos(tipo: string) {
    this.viewFondos = tipo;
    this.mostrarFormulario = (tipo === 'nuevosFondos');
  }

  seleccionarFondo(fondo: any) {
    this.fondoSeleccionado = fondo;
    this.mostrarFormulario = true; 
  }
}
