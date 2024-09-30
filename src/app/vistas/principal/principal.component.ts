import { Component, OnInit, NgZone } from '@angular/core';
import { EventService } from '../../services/event-Service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  currentView: string = 'fondos';
  events: string[] = [];

  constructor(private eventService: EventService, private zone: NgZone) {}

  ngOnInit() {
    this.eventService.events$.subscribe(event => {
      if (event) {
        this.zone.run(() => {
          this.events.push(event);
          alert(`Nueva notificación: ${event}`);
        });
      }
    });
  }

  mostrarFondos() {
    this.currentView = 'fondos';
  }

  mostrarTransacciones() {
    this.currentView = 'transacciones';
  }
}
