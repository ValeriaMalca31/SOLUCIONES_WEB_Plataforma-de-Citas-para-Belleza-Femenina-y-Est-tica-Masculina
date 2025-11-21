import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-negocio-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 2rem; text-align: center;">
      <h1>Detalle del Negocio</h1>
      <p>Este componente será implementado por tu compañero</p>
    </div>
  `
})
export class NegocioDetail {
  constructor() {}
}