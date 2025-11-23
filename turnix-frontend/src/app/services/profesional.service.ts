import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los profesionales de un negocio específico
   */
  getProfesionalesPorNegocio(negocioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/negocios/${negocioId}/profesionales`);
  }

  /**
   * Obtiene un profesional por ID
   */
  getProfesionalById(profesionalId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profesionales/${profesionalId}`);
  }
}