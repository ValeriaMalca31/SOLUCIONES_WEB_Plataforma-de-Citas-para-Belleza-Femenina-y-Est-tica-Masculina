<<<<<<< HEAD
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
=======
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NegocioService } from '../../services/negocio.service';
import { forkJoin } from 'rxjs'; 
import { NgIf, NgFor, CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-negocio-detail',
  templateUrl: './negocio-detail.html',
  styleUrls: ['./negocio-detail.css'],
  standalone: true, // ¡Importante!
  imports: [NgIf, NgFor, CommonModule] // ¡Importante!
})
export class NegocioDetail implements OnInit {

  negocio: any; // Variable para guardar los datos del negocio
  galeria: any[] = []; // Variable para guardar la galería de fotos
  negocioId: number = 0; // Variable para el ID de la URL

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private negocioService: NegocioService
  ) {}

  ngOnInit(): void {
    // 1. Obtiene el 'id' de la URL
    this.negocioId = Number(this.route.snapshot.paramMap.get('id'));

    // 2. Si hay un ID, cargamos los datos
    if (this.negocioId) {
      // Usamos forkJoin para hacer 2 llamadas a la API al mismo tiempo
      // y esperar a que ambas terminen.
      forkJoin({
        negocio: this.negocioService.getNegocioById(this.negocioId),
        galeria: this.negocioService.getGaleriaPorNegocio(this.negocioId)
      }).subscribe(resultado => {
        // Cuando ambas terminan, guardamos los datos
        this.negocio = resultado.negocio;
        this.galeria = resultado.galeria;
      });
    }
  }

  /**
  
   * Te llevará a la ruta /booking/ID
   * (ej. /booking/1)
   */
  irAReservar() {
    // Esto navega a la ruta /booking/[ID_DEL_NEGOCIO]
    // ej. /booking/1
    this.router.navigate(['/booking', this.negocioId]);
  }
>>>>>>> origin/abrhyl
}