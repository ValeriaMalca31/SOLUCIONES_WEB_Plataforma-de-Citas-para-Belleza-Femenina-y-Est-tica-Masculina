import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  // Apuntamos a nuestro backend en localhost:3000
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de servicios filtrando por el ID del negocio
   * Llama a: GET http://localhost:3000/servicios?negocioId=1
   */
  getServiciosPorNegocio(negocioId: number): Observable<any[]> {
    // Usamos el ID del negocio para filtrar los servicios
    return this.http.get<any[]>(`${this.apiUrl}/servicios?negocioId=${negocioId}`);
  }
}