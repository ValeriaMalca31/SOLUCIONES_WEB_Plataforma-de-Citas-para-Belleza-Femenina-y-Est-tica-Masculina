import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {
  // Conectamos a nuestro json-server (el "backend falso")
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene solo los profesionales que pertenecen a un negocio específico
   * (ej. /profesionales?negocioId=1)
   */
  getProfesionalesPorNegocio(negocioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/profesionales?negocioId=${negocioId}`);
  }
}