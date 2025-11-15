import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-negocio-detail',
  templateUrl: './negocio-detail.html',
  styleUrls: ['./negocio-detail.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NegocioDetail implements OnInit {
  negocio: any = null;
  serviciosDestacados: any[] = [];
  
  // DATOS DE NEGOCIOS - CADA UNO DIFERENTE
  private datosNegocios: any = {
    1: {
      id: 1,
      nombre: 'Barbería Classic',
      imagenPortada: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
      calificacion: 4.8,
      resenas: 156,
      direccion: 'Av. Lima 123, Miraflores, Lima',
      telefono: '+51 987 654 321',
      horario: 'Lun-Sáb: 9:00 AM - 8:00 PM | Dom: 10:00 AM - 6:00 PM',
      descripcion: 'Barbería moderna con más de 5 años de experiencia especializada en cortes clásicos y modernos. Utilizamos productos de primera calidad y técnicas actualizadas.',
      galeria: [
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400',
        'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400',
        'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
      ]
    },
    2: {
      id: 2,
      nombre: 'The Gentlemen\'s Cut',
      imagenPortada: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800',
      calificacion: 4.9,
      resenas: 203,
      direccion: 'Jr. Trujillo 456, San Isidro, Trujillo',
      telefono: '+51 987 654 322',
      horario: 'Lun-Dom: 8:00 AM - 9:00 PM',
      descripcion: 'Barbería de lujo especializada en cortes ejecutivos y cuidado de barba. Ambiente premium con atención personalizada y productos exclusivos.',
      galeria: [
        'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400',
        'https://images.unsplash.com/photo-1567894340315-735d5c7b8e52?w=400',
        'https://images.unsplash.com/photo-1503951458640-4c797c43d281?w=400',
        'https://images.unsplash.com/photo-1598706643680-5efc47e0f0c9?w=400'
      ]
    },
    3: {
      id: 3,
      nombre: 'Nail Studio',
      imagenPortada: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800',
      calificacion: 4.7,
      resenas: 89,
      direccion: 'Av. Arequipa 789, Lince, Lima',
      telefono: '+51 987 654 323',
      horario: 'Mar-Dom: 10:00 AM - 7:00 PM | Lun: Cerrado',
      descripcion: 'Estudio especializado en cuidado de uñas, manicure y pedicure. Utilizamos productos hipoalergénicos y técnicas modernas.',
      galeria: [
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
        'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400',
        'https://images.unsplash.com/photo-1607778833979-4c13f2d866d2?w=400'
      ]
    },
    4: {
      id: 4,
      nombre: 'Style & Beauty',
      imagenPortada: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
      calificacion: 4.6,
      resenas: 134,
      direccion: 'Calle Bolívar 321, Centro de Lima',
      telefono: '+51 987 654 324',
      horario: 'Lun-Sáb: 8:30 AM - 7:30 PM | Dom: 9:00 AM - 5:00 PM',
      descripcion: 'Salón mixto que ofrece servicios de barbería, estética facial y cuidado personal. Equipo profesional con más de 8 años de experiencia.',
      galeria: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
        'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400',
        'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400',
        'https://images.unsplash.com/photo-1595476108010-b4d1f102b1e1?w=400'
      ]
    }
  };

  // SERVICIOS POR NEGOCIO - DIFERENTES
  private serviciosPorNegocio: any = {
    1: [ // Barbería Classic
      { nombre: 'Corte Clásico', descripcion: 'Corte tradicional con tijera y máquina', duracion: '30 min', precio: 25 },
      { nombre: 'Corte Moderno', descripcion: 'Corte con técnicas actualizadas', duracion: '45 min', precio: 35 },
      { nombre: 'Afeitado Clásico', descripcion: 'Afeitado con navaja y productos premium', duracion: '25 min', precio: 20 },
      { nombre: 'Tratamiento Capilar', descripcion: 'Hidratación y cuidado del cabello', duracion: '40 min', precio: 30 }
    ],
    2: [ // The Gentlemen's Cut
      { nombre: 'Corte Ejecutivo', descripcion: 'Corte premium para profesionales', duracion: '50 min', precio: 45 },
      { nombre: 'Corte + Barba Premium', descripcion: 'Corte completo y arreglo de barba con productos exclusivos', duracion: '60 min', precio: 55 },
      { nombre: 'Tratamiento Facial', descripcion: 'Limpieza e hidratación facial', duracion: '35 min', precio: 40 },
      { nombre: 'Masaje Capilar', descripcion: 'Masaje relajante para el cuero cabelludo', duracion: '25 min', precio: 25 }
    ],
    3: [ // Nail Studio
      { nombre: 'Manicure Básico', descripcion: 'Limpieza y cuidado de uñas', duracion: '40 min', precio: 35 },
      { nombre: 'Pedicure Spa', descripcion: 'Pedicure con tratamiento hidratante', duracion: '60 min', precio: 45 },
      { nombre: 'Uñas Acrílicas', descripcion: 'Aplicación de uñas acrílicas', duracion: '90 min', precio: 65 },
      { nombre: 'Esmaltado Semi-Permanente', descripcion: 'Esmaltado de larga duración', duracion: '50 min', precio: 40 }
    ],
    4: [ // Style & Beauty
      { nombre: 'Corte Unisex', descripcion: 'Corte para caballero o dama', duracion: '40 min', precio: 30 },
      { nombre: 'Tratamiento Facial Completo', descripcion: 'Limpieza, exfoliación e hidratación', duracion: '70 min', precio: 50 },
      { nombre: 'Manicure y Pedicure', descripcion: 'Combo completo de uñas', duracion: '80 min', precio: 60 },
      { nombre: 'Corte + Barba Básico', descripcion: 'Corte y arreglo de barba estándar', duracion: '45 min', precio: 35 }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarNegocio();
  }

  cargarNegocio() {
    const negocioId = this.route.snapshot.paramMap.get('id');
    
    if (negocioId && this.datosNegocios[negocioId]) {
      this.negocio = this.datosNegocios[negocioId];
      this.serviciosDestacados = this.serviciosPorNegocio[negocioId] || [];
    } else {
      // Si no existe, redirigir al home
      this.router.navigate(['/']);
    }
  }

  volver() {
    this.router.navigate(['/']);
  }

  reservarCita() {
    if (this.negocio) {
      this.router.navigate(['/booking', this.negocio.id]);
    }
  }

  // Método para manejar errores de imágenes
  cargarImagenDefault(event: any) {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=';
  }
}