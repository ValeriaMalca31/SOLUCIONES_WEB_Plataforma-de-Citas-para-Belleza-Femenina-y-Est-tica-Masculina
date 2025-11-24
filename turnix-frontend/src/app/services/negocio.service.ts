import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// --- INTERFACES CORREGIDAS PARA QUE COINCIDAN CON TU HOME.TS ---

export interface Negocio {
  id: number;
  // Estos nombres deben coincidir con lo que envía tu Backend Java (Negocio.java)
  nombreNegocio: string;
  direccion: string;
  telefonoNegocio: string;
  horarioApertura: string;
  horarioCierre: string;
  
  // Propiedades opcionales (?) para que home.ts pueda usarlas sin error
  // aunque no vengan directamente de la base de datos
  ciudad?: string;           
  precioMinimo?: number;
  calificacionPromedio?: number;
  numeroResenas?: number;
  imagenUrl?: string; 
  tipo?: string; // Para el filtro de categorías
}

export interface Servicio {
  id: number;
  negocio: { id: number };
  nombreServicio: string;
  precio: number;
  duracionEstimada: number;
}

export interface Profesional {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  activo: boolean;
}

export interface Galeria {
  id: number;
  negocio: { id: number };
  urlImagen: string;
  descripcion: string;
}

export interface Resena {
  id: number;
  calificacion: number;
  comentario: string;
  fechaCreacion: string;
}

export interface CitaRequest {
  clienteId: number;
  negocioId: number;
  profesionalId: number;
  servicioId: number;
  fechaHoraInicio: string; 
  fechaHoraFin: string;
  estado: string;
  precioFinal: number;
  notasPromocion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  // Asegúrate que este puerto sea el correcto de tu Spring Boot (8080 usualmente)
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  // --- MÉTODO QUE FALTABA EN TU ERROR DE HOME.TS ---
  obtenerNegocios(): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(`${this.apiUrl}/negocios`);
  }

  // Obtener un negocio por ID (Para la página de detalle)
  getNegocio(id: number): Observable<Negocio> {
    return this.http.get<Negocio>(`${this.apiUrl}/negocios/${id}`).pipe(
      map(n => {
        // Asignación de imágenes estáticas según PDF para el detalle
        if (n.id === 1) n.imagenUrl = '/resources/static/images/barberia-fachada.jpg';
        if (n.id === 2) n.imagenUrl = '/resources/static/images/salon-fachada.webp';
        return n;
      })
    );
  }

  // Servicios
  getServicios(negocioId: number): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/servicios`).pipe(
      // Filtramos en el front porque el backend devuelve todos (getAll)
      map(servicios => servicios.filter(s => s.negocio && s.negocio.id === negocioId))
    );
  }

  // Profesionales
  getProfesionales(negocioId: number): Observable<Profesional[]> {
    // Aquí idealmente filtrarías por negocio si tu backend lo soportara
    return this.http.get<Profesional[]>(`${this.apiUrl}/profesionales`);
  }

  // Galería
  getGaleria(negocioId: number): Observable<Galeria[]> {
    return this.http.get<Galeria[]>(`${this.apiUrl}/galerias`).pipe(
      map(fotos => fotos.filter(f => f.negocio && f.negocio.id === negocioId))
    );
  }

  // Reseñas
  getResenas(negocioId: number): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/resenas`);
  }

  // Crear Cita
  crearCita(cita: CitaRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/citas`, cita);
  }
}