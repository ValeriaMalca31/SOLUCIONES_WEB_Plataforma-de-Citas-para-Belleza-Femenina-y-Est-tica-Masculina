import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NegocioService, Negocio } from '../../services/negocio.service';

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
  categorias = ['Todos', 'Barberías', 'Salones de Uñas', 'Cercanos'];
  categoriaActiva = 'Todos';
  terminoBusqueda = '';
  cargando = false;
  error = '';

  constructor(
    private router: Router,
    private negocioService: NegocioService
  ) {}

  ngOnInit(): void {
    this.cargarNegocios();
  }

  // 🔹 MÉTODO PARA CARGAR DESDE EL BACKEND
  cargarNegocios(): void {
    this.cargando = true;
    this.error = '';

    this.negocioService.obtenerNegocios().subscribe({
      next: (data: Negocio[]) => {
        console.log('✅ Datos recibidos del backend:', data);
        
        // 🔹 Mapea los datos del backend a tu formato
        this.negocios = data.map((negocio: Negocio) => ({
          ...negocio,
          nombre: negocio.nombreNegocio,
          direccion: `${negocio.direccion}, ${negocio.ciudad}`,
          imagenUrl: negocio.imagenPrincipal || this.getImagenDefault(negocio.tipo),
          precioMinimo: negocio.precioMinimo || 25,
          calificacion: negocio.calificacionPromedio || 4.5,
          numeroResenas: 0
        }));

        this.negociosFiltrados = [...this.negocios];
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('❌ Error al cargar negocios:', err);
        this.error = 'No se pudieron cargar los negocios. Usando datos de ejemplo.';
        this.cargando = false;
        
        // 🔹 Si falla, usa datos de ejemplo
        this.cargarDatosEjemplo();
      }
    });
  }

  // 🔹 Método auxiliar para imagen por defecto según tipo
  getImagenDefault(tipo: string): string {
    const imagenes: { [key: string]: string } = {
      'BARBERÍA': 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500',
      'UÑAS': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500',
      'MIXTO': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500'
    };
    return imagenes[tipo] || imagenes['BARBERÍA'];
  }

  // 🔹 Datos de ejemplo si el backend no responde
  cargarDatosEjemplo(): void {
    console.log('⚠️ Usando datos de ejemplo');
    
    this.negocios = [
      {
        id: 1,
        nombreNegocio: 'Barber Den',
        nombre: 'Barber Den',
        direccion: '488 Oak Avenue, Anytown',
        ciudad: 'Anytown',
        telefono: '123456789',
        descripcion: 'Barbería moderna',
        imagenUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&h=400&fit=crop',
        precioMinimo: 25,
        tipo: 'BARBERÍA',
        calificacion: 4.8,
        numeroResenas: 169
      },
      {
        id: 2,
        nombreNegocio: 'The Gentlemen\'s Cut',
        nombre: 'The Gentlemen\'s Cut',
        direccion: 'Jr. Trujillo 456, San Isidro',
        ciudad: 'Lima',
        telefono: '987654321',
        descripcion: 'Cortes de caballero',
        imagenUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&h=400&fit=crop',
        precioMinimo: 30,
        tipo: 'BARBERÍA',
        calificacion: 4.9,
        numeroResenas: 302
      },
      {
        id: 3,
        nombreNegocio: 'Polished Perfection',
        nombre: 'Polished Perfection',
        direccion: '488 Oak Avenue, Anytown',
        ciudad: 'Anytown',
        telefono: '555123456',
        descripcion: 'Salón de uñas premium',
        imagenUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=400&fit=crop',
        precioMinimo: 35,
        tipo: 'UÑAS',
        calificacion: 4.8,
        numeroResenas: 169
      },
      {
        id: 4,
        nombreNegocio: 'Fade Masters',
        nombre: 'Fade Masters',
        direccion: '288 Pine Lane, Anytown',
        ciudad: 'Anytown',
        telefono: '555987654',
        descripcion: 'Especialistas en fade',
        imagenUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&h=400&fit=crop',
        precioMinimo: 28,
        tipo: 'BARBERÍA',
        calificacion: 5.0,
        numeroResenas: 502
      },
      {
        id: 5,
        nombreNegocio: 'The Nail Suite',
        nombre: 'The Nail Suite',
        direccion: '101 Beauty Blvd, Centro',
        ciudad: 'Lima',
        telefono: '555456789',
        descripcion: 'Uñas de diseño',
        imagenUrl: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500&h=400&fit=crop',
        precioMinimo: 40,
        tipo: 'UÑAS',
        calificacion: 4.8,
        numeroResenas: 150
      },
      {
        id: 6,
        nombreNegocio: 'Classic Barber Shop',
        nombre: 'Classic Barber Shop',
        direccion: 'Av. Arequipa 789, Lince',
        ciudad: 'Lima',
        telefono: '555321654',
        descripcion: 'Cortes clásicos',
        imagenUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&h=400&fit=crop',
        precioMinimo: 22,
        tipo: 'BARBERÍA',
        calificacion: 4.7,
        numeroResenas: 234
      },
      {
        id: 7,
        nombreNegocio: 'Nail Art Studio',
        nombre: 'Nail Art Studio',
        direccion: 'Calle San Martín 555, Miraflores',
        ciudad: 'Lima',
        telefono: '555789123',
        descripcion: 'Arte en uñas',
        imagenUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500&h=400&fit=crop',
        precioMinimo: 45,
        tipo: 'UÑAS',
        calificacion: 4.9,
        numeroResenas: 188
      },
      {
        id: 8,
        nombreNegocio: 'Urban Cuts',
        nombre: 'Urban Cuts',
        direccion: 'Av. Larco 1234, Miraflores',
        ciudad: 'Lima',
        telefono: '555147258',
        descripcion: 'Cortes modernos',
        imagenUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&h=400&fit=crop',
        precioMinimo: 35,
        tipo: 'BARBERÍA',
        calificacion: 4.6,
        numeroResenas: 276
      }
    ];
    
    this.negociosFiltrados = [...this.negocios];
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    this.filtrarNegocios();
  }

  buscarNegocios(): void {
    this.filtrarNegocios();
    this.desplazarAResultados();
  }

  filtrarNegocios(): void {
    let resultados = this.negocios;

    // Filtrar por categoría
    if (this.categoriaActiva !== 'Todos') {
      const categoriaMap: { [key: string]: string } = {
        'Barberías': 'BARBERÍA',
        'Salones de Uñas': 'UÑAS',
        'Cercanos': 'CERCANO'
      };
      
      const tipoFiltro = categoriaMap[this.categoriaActiva];
      if (tipoFiltro) {
        resultados = resultados.filter(negocio => 
          negocio.tipo === tipoFiltro
        );
      }
    }

    // Filtrar por término de búsqueda
    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      resultados = resultados.filter(negocio =>
        (negocio.nombre || negocio.nombreNegocio || '').toLowerCase().includes(termino)
      );
    }

    this.negociosFiltrados = resultados;
  }

  desplazarAResultados(): void {
    setTimeout(() => {
      if (this.businessSection) {
        const element = this.businessSection.nativeElement;
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  verDetalle(negocio: any): void {
    this.router.navigate(['/negocio', negocio.id]);
  }

  cargarImagenDefault(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmb250LWZhbWlseT0iQXJpYWwiPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
  }

  limpiarBusqueda(): void {
    this.terminoBusqueda = '';
    this.categoriaActiva = 'Todos';
    this.negociosFiltrados = [...this.negocios];
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}