import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Home implements OnInit {
  negocios: any[] = [];
  categorias = ['BARBERÍA', 'UÑAS', 'MIXTO'];
  categoriaActiva = 'BARBERÍA';
  terminoBusqueda = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.cargarNegocios();
  }

  cargarNegocios() {
    // Datos de ejemplo - luego reemplazar con API real
    this.negocios = [
      {
        id: 1,
        nombre: 'Barbería Classic',
        direccion: 'Av. Lima 123, Miraflores',
        imagenUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400',
        precioMinimo: 25,
        tipo: 'BARBERÍA',
        calificacion: 4.8
      },
      {
        id: 2,
        nombre: 'The Gentlemen\'s Cut',
        direccion: 'Jr. Trujillo 456, San Isidro',
        imagenUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400',
        precioMinimo: 30,
        tipo: 'BARBERÍA',
        calificacion: 4.9
      },
      {
        id: 3,
        nombre: 'Nail Studio',
        direccion: 'Av. Arequipa 789, Lince',
        imagenUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
        precioMinimo: 35,
        tipo: 'UÑAS',
        calificacion: 4.7
      },
      {
        id: 4,
        nombre: 'Style & Beauty',
        direccion: 'Calle Bolívar 321, Centro',
        imagenUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
        precioMinimo: 40,
        tipo: 'MIXTO',
        calificacion: 4.6
      }
    ];
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaActiva = categoria;
    console.log('Filtrando por:', categoria);
  }

  verDetalle(id: number) {
    this.router.navigate(['/negocio', id]);
  }

  buscarNegocios() {
    if (this.terminoBusqueda.trim()) {
      console.log('Buscando:', this.terminoBusqueda);
      // Aquí iría la lógica de búsqueda real
    }
  }

  get negociosFiltrados() {
    if (this.categoriaActiva === 'TODOS') {
      return this.negocios;
    }
    return this.negocios.filter(negocio => 
      negocio.tipo === this.categoriaActiva
    );
  }
}