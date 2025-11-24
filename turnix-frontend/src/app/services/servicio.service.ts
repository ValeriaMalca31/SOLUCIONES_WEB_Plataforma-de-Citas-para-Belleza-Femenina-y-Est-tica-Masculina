import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost:8080/api';
=======

  // Apuntamos a nuestro backend en localhost:3000
  private apiUrl = 'http://localhost:3000';
>>>>>>> origin/abrhyl

  constructor(private http: HttpClient) { }

  /**
<<<<<<< HEAD
   * Obtiene los servicios de un negocio específico
   */
  getServiciosPorNegocio(negocioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/negocios/${negocioId}/servicios`);
  }

  /**
   * Obtiene un servicio por ID
   */
  getServicioById(servicioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/servicios/${servicioId}`);
=======
   * Obtiene la lista de servicios filtrando por el ID del negocio
   * Llama a: GET http://localhost:3000/servicios?negocioId=1
   */
  getServiciosPorNegocio(negocioId: number): Observable<any[]> {
    // Usamos el ID del negocio para filtrar los servicios
    return this.http.get<any[]>(`${this.apiUrl}/servicios?negocioId=${negocioId}`);
>>>>>>> origin/abrhyl
  }
}