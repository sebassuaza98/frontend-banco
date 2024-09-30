import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventSubject = new BehaviorSubject<string | null>(null);
  public events$ = this.eventSubject.asObservable();
  private eventSource: EventSource | null = null;

  constructor() {
    this.connectToEventSource();
  }

  private connectToEventSource() {
    this.eventSource = new EventSource('http://localhost:8080/api/fondos/events');

    this.eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        this.eventSubject.next(parsedData);
      } catch (e) {
        this.eventSubject.next(event.data);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('Error en EventSource:', error);
      if (this.eventSource?.readyState === EventSource.CLOSED) {
        console.log('Conexión cerrada.');
      }
    };
  }

  public disconnectEventSource() {
    if (this.eventSource) {
      this.eventSource.close();
      console.log('Conexión cerrada manualmente.');
    }
  }
}
