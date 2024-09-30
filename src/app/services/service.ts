import { Injectable, EventEmitter } from '@angular/core';
import { Fondo } from '../model/fondo.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private _nombreCliente: string = '';
  private _saldo: number = 0;
  private _identificacion: string = '';
  private fondos: Fondo[] = [];

  public clientDataChanged: EventEmitter<any> = new EventEmitter();

  setClientData(nombre: string, saldo: number, identificacion: string) {
    this._nombreCliente = nombre;
    this._saldo = saldo;
    this._identificacion = identificacion;
    this.clientDataChanged.emit({ nombre, saldo, identificacion });
  }

  get nombreCliente() {
    return this._nombreCliente;
  }

  get saldo() {
    return this._saldo;
  }

  get identificacion() {
    return this._identificacion;
  }
  setFondos(fondos: Fondo[]) {
    this.fondos = fondos;
  }

  getFondos(): Fondo[] {
    return this.fondos;
  }
}
