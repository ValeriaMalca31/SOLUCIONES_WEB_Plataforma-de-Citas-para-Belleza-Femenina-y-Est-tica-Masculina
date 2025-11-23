import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  // Métodos para negocios
  getNegocios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/negocios`, { headers: this.getHeaders() });
  }

  getNegocioById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/negocios/${id}`, { headers: this.getHeaders() });
  }

  // Métodos para citas
  crearCita(cita: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/citas`, cita, { headers: this.getHeaders() });
  }

  getCitas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/citas`, { headers: this.getHeaders() });
  }

  // Métodos para servicios
  getServiciosByNegocio(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/negocios/${id}/servicios`, { headers: this.getHeaders() });
  }

  // Métodos para horarios disponibles
  getHorariosDisponibles(negocioId: any, fecha: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/negocios/${negocioId}/horarios?fecha=${fecha}`, { headers: this.getHeaders() });
  }
}