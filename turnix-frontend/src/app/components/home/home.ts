import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Home implements OnInit {
  @ViewChild('businessSection') businessSection!: ElementRef;
  
  negocios: any[] = [];
  negociosFiltrados: any[] = [];
  categorias = ['BARBERÍA', 'UÑAS', 'MIXTO'];
  categoriaActiva = 'BARBERÍA';
  terminoBusqueda = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarNegocios();
  }

  cargarNegocios() {
    // SOLO 4 NEGOCIOS ORIGINALES
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
    
    this.negociosFiltrados = this.negocios.filter(negocio => 
      negocio.tipo === this.categoriaActiva
    );
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaActiva = categoria;
    this.filtrarNegocios();
  }

  buscarNegocios() {
    this.filtrarNegocios();
    this.desplazarAResultados();
  }

  filtrarNegocios() {
    let resultados = this.negocios;

    // Filtrar por categoría
    if (this.categoriaActiva !== 'TODOS') {
      resultados = resultados.filter(negocio => 
        negocio.tipo === this.categoriaActiva
      );
    }

    // Filtrar SOLO por nombre (no dirección, no descripción)
    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      resultados = resultados.filter(negocio =>
        negocio.nombre.toLowerCase().includes(termino)
      );
    }

    this.negociosFiltrados = resultados;
  }

  desplazarAResultados() {
    setTimeout(() => {
      if (this.businessSection) {
        const element = this.businessSection.nativeElement;
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  verDetalle(negocio: any) {
    this.router.navigate(['/negocio', negocio.id]);
  }

  cargarImagenDefault(event: any) {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=';
  }

    limpiarBusqueda() {
    this.terminoBusqueda = '';
    // 🔹 CAMBIO: Al limpiar, vuelve a mostrar solo la categoría activa
    this.negociosFiltrados = this.negocios.filter(negocio => 
      negocio.tipo === this.categoriaActiva
    );
  }
}