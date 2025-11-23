import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 2rem; text-align: center;">
      <h1>Reservar Cita</h1>
      <p>Este componente será implementado por tu compañero</p>
    </div>
  `
})
export class Booking {
  constructor() {}
}