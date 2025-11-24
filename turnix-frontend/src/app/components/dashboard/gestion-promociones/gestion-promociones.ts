import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-gestion-promociones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-promociones.html',
  styleUrls: ['./gestion-promociones.css']
})
export class GestionPromocionesComponent implements OnInit {
  promociones: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPromociones().subscribe(
      (data: any[]) => {
        this.promociones = data;
        console.log('Promociones cargadas:', this.promociones);
      },
      (error: any) => {
        console.error('Error al cargar las promociones:', error);
      }
    );
  }
}