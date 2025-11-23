import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 🔹 Interface para el Negocio
export interface Negocio {
  id: number;
  nombreNegocio: string;
  descripcion?: string;
  direccion: string;
  ciudad: string;
  telefono?: string;
  tipo: string;
  calificacionPromedio?: number;
  precioMinimo?: number;
  imagenPrincipal?: string;
  // Propiedades adicionales para el frontend
  nombre?: string;
  imagenUrl?: string;
  calificacion?: number;
  numeroResenas?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  // 🔹 URL de tu backend Spring Boot
  private readonly apiUrl = 'http://localhost:8080/api/negocios';

  constructor(private http: HttpClient) {}

  // 📥 Obtener todos los negocios
  obtenerNegocios(): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(this.apiUrl);
  }

  // 📥 Obtener un negocio por ID
  obtenerNegocioPorId(id: number): Observable<Negocio> {
    return this.http.get<Negocio>(`${this.apiUrl}/${id}`);
  }

  // 📥 Buscar negocios por ciudad
  buscarPorCiudad(ciudad: string): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(`${this.apiUrl}/ciudad/${ciudad}`);
  }

  // 📥 Buscar negocios por tipo
  buscarPorTipo(tipo: string): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(`${this.apiUrl}/tipo/${tipo}`);
  }

  // 📥 Obtener negocios destacados
  obtenerDestacados(): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(`${this.apiUrl}/destacados`);
  }
}