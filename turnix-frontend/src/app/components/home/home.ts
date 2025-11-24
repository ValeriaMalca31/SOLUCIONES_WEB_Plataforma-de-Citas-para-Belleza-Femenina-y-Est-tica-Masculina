import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   
import { NegocioService, Negocio } from '../../services/negocio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  // Estos imports son los que hacen que funcionen las directivas en el HTML
  imports: [CommonModule, FormsModule, RouterModule] 
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

  cargarNegocios(): void {
    this.cargando = true;
    this.error = '';

    this.negocioService.obtenerNegocios().subscribe({
      next: (data: Negocio[]) => {
        console.log('✅ Negocios cargados:', data);
        
        if (!data || data.length === 0) {
          this.cargando = false;
          return;
        }

        this.negocios = data.map((negocio: Negocio) => {
          // Validamos que nombreNegocio exista
          const nombre = negocio.nombreNegocio || 'Negocio';
          const tipoCalculado = this.determinarTipo(nombre);
          
          return {
            ...negocio,
            id: negocio.id,
            nombre: nombre,
            ciudad: negocio.ciudad || 'Lima', 
            tipo: tipoCalculado,
            imagenUrl: negocio.imagenUrl || this.getImagenDefault(tipoCalculado),
            precioMinimo: negocio.precioMinimo || 18,
            calificacion: negocio.calificacionPromedio || 4.8,
            numeroResenas: negocio.numeroResenas || 1
          };
        });

        this.negociosFiltrados = [...this.negocios];
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('❌ Error de conexión:', err);
        this.error = 'No se pudo conectar con el servidor.';
        this.cargando = false;
      }
    });
  }

  // --- LÓGICA PARA EL CLICK ---
  verDetalle(negocio: any): void {
    console.log('🔎 Navegando a:', negocio);
    const id = negocio?.id || negocio;
    if (id) {
      this.router.navigate(['/negocio', id]);
    }
  }

  determinarTipo(nombre: string): string {
    if (!nombre) return 'MIXTO';
    const n = nombre.toLowerCase();
    if (n.includes('barber') || n.includes('cut') || n.includes('fade')) return 'BARBERÍA';
    if (n.includes('uña') || n.includes('nail') || n.includes('beauty')) return 'UÑAS';
    return 'MIXTO';
  }

  getImagenDefault(tipo: string): string {
    const imagenes: { [key: string]: string } = {
      'BARBERÍA': '/resources/static/images/barberia-fachada.jpg',
      'UÑAS': '/resources/static/images/salon-fachada.webp',
      'MIXTO': '/resources/static/images/salon-fachada.webp',
    };
    return imagenes[tipo] || imagenes['BARBERÍA'];
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

    if (this.categoriaActiva !== 'Todos') {
      const categoriaMap: { [key: string]: string } = {
        'Barberías': 'BARBERÍA',
        'Salones de Uñas': 'UÑAS',
        'Cercanos': 'CERCANO'
      };
      const tipoFiltro = categoriaMap[this.categoriaActiva];
      if (tipoFiltro) {
        resultados = resultados.filter(n => n.tipo === tipoFiltro);
      }
    }

    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      resultados = resultados.filter(n =>
        (n.nombre || '').toLowerCase().includes(termino)
      );
    }

    this.negociosFiltrados = resultados;
  }

  desplazarAResultados(): void {
    setTimeout(() => {
      if (this.businessSection) {
        const element = this.businessSection.nativeElement;
        const offset = element.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, 100);
  }

  cargarImagenDefault(event: any): void {
    event.target.src = 'https://via.placeholder.com/500x400?text=Turnix';
  }

  limpiarBusqueda(): void {
    this.terminoBusqueda = '';
    this.categoriaActiva = 'Todos';
    this.negociosFiltrados = [...this.negocios];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}