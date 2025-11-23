import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene horarios disponibles para un profesional en una fecha
   * 🔹 CORREGIDO: Solo necesita profesionalId y fecha
   */
  getHorariosDisponibles(profesionalId: number, fecha: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/profesionales/${profesionalId}/horarios?fecha=${fecha}`);
  }

  /**
   * Obtiene la disponibilidad semanal de un profesional
   */
  getDisponibilidadSemanal(profesionalId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/profesionales/${profesionalId}/disponibilidad`);
  }
}