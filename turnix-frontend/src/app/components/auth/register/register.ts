
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 2rem; text-align: center;">
      <h1>Página de Registro</h1>
      <p>Este componente será implementado por tu compañero</p>
    </div>
  `
})
export class Register {
  constructor() {}
}