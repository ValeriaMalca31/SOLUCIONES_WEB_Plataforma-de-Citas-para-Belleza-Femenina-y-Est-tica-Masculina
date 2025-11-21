import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  /**
   * Crea una nueva cita
   */
  crearCita(citaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/citas`, citaData);
  }

  /**
   * Obtiene las citas de un usuario
   */
  getCitasPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/citas/usuario/${usuarioId}`);
  }

  /**
   * Cancela una cita
   */
  cancelarCita(citaId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/citas/${citaId}/cancelar`, {});
  }
}