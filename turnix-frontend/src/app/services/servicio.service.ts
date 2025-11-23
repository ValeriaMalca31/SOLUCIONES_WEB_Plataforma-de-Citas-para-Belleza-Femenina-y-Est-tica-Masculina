import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  /**
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
  }
}