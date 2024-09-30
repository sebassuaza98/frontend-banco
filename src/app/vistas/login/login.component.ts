import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ClientService } from '../../services/service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  documento: number | null = null;

  constructor(private http: HttpClient, private router: Router, private clientService: ClientService) {}

  onSubmit() {
    if (this.documento && this.documento.toString().trim() !== '') {
      const documentoStr = this.documento.toString();
      this.http.get<any[]>(`http://localhost:8080/api/clientes`).subscribe(clientes => {
        const clienteExistente = clientes.find(cliente => cliente.identificacion === documentoStr);
        
        if (clienteExistente) {
          localStorage.setItem('clienteData', JSON.stringify(clienteExistente));
          
          this.clientService.setClientData(clienteExistente.nombre, clienteExistente.saldo,clienteExistente.identificacion);
          this.router.navigate(['/principal']);
        } else {
          alert('Documento no encontrado.');
        }
      }, error => {
        alert('Conectese al Servidor.');
      });
    } else {
      alert('Por favor, ingrese un documento válido.');
    }
  }
  
}
