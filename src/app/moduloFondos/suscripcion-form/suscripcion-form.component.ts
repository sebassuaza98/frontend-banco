import { Component, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../../services/service';

@Component({
  selector: 'app-suscripcion-form',
  templateUrl: './suscripcion-form.component.html',
  styleUrls: ['./suscripcion-form.component.css']
})
export class SuscripcionFormComponent {
  @Input() fondoId: string | null = null;
  monto: number | null = null;
  identificacion: string | null = null;
  mensaje: string = '';
  @Output() cargarMisTransacciones = new EventEmitter<void>();
  @Input() fondoNombre: string | null = null;

  constructor(private http: HttpClient, private clientService: ClientService) {
    const clienteData = localStorage.getItem('clienteData');
    if (clienteData) {
      this.identificacion = JSON.parse(clienteData).identificacion;
    }
  }

  suscribirse() {
    if (!this.fondoId || typeof this.fondoId !== 'string' || this.fondoId.trim() === '') {
      alert('Por favor, ingrese un ID de fondo válido.');
      return;
    }

    if (!this.identificacion || typeof this.identificacion !== 'string' || this.identificacion.trim() === '') {
      alert('Por favor, ingrese una identificación válida.');
      return;
    }

    if (this.monto === null || isNaN(this.monto) || this.monto <= 0) {
      alert('Por favor, ingrese un monto válido mayor que cero.');
      return;
    }

    const params = {
      fondoId: this.fondoId!,
      identificacion: this.identificacion!,
      monto: this.monto.toString()
    };

    this.http.post(`http://localhost:8080/api/transaccion/suscribirse`, null, { params })
      .subscribe(response => {
        this.mensaje = 'Suscripción exitosa';
        this.cargarMisTransacciones.emit();
        const nuevoSaldo = this.clientService.saldo - this.monto!;
        this.clientService.setClientData(this.clientService.nombreCliente, nuevoSaldo, this.identificacion!);
        this.monto = null;
      }, error => {
        this.mensaje = error.error;
      });
  }
}
