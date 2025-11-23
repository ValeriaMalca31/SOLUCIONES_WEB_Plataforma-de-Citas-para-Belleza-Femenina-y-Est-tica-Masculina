import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

<<<<<<< HEAD
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

=======
>>>>>>> origin/abrhyl
@Injectable({
  providedIn: 'root'
})
export class NegocioService {
<<<<<<< HEAD
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
=======

  /**
   * Esta es la URL de tu backend FALSO (json-server).
   * Habla con http://localhost:3000
   */
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos de UN SOLO negocio por su ID.
   * Llama a: GET http://localhost:3000/negocios/1
   */
  getNegocioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/negocios/${id}`);
  }

  /**
   * Obtiene las fotos de la galería de UN SOLO negocio.
   * Llama a: GET http://localhost:3000/galeriasNegocio?negocioId=1
   */
  getGaleriaPorNegocio(negocioId: number): Observable<any[]> {
    // Usamos ?negocioId= para "filtrar" las fotos por el ID del negocio
    return this.http.get<any[]>(`${this.apiUrl}/galeriasNegocio?negocioId=${negocioId}`);
>>>>>>> origin/abrhyl
  }
}