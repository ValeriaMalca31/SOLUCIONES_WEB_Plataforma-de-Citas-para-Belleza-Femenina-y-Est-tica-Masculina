import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Métodos para negocios
  getNegocios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/negocios`);
  }

  getNegocioById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/negocios/${id}`);
  }

  // Métodos para citas
  crearCita(cita: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/citas`, cita);
  }

  getCitas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/citas`);
  }

  // Métodos para servicios
  getServiciosByNegocio(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/negocios/${id}/servicios`);
  }

  // Métodos para horarios disponibles
  getHorariosDisponibles(negocioId: any, fecha: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/negocios/${negocioId}/horarios?fecha=${fecha}`);
  }
}