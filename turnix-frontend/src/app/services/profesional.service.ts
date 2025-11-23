import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost:8080/api';
=======
  // Conectamos a nuestro json-server (el "backend falso")
  private apiUrl = 'http://localhost:3000';
>>>>>>> origin/abrhyl

  constructor(private http: HttpClient) { }

  /**
<<<<<<< HEAD
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
=======
   * Obtiene solo los profesionales que pertenecen a un negocio específico
   * (ej. /profesionales?negocioId=1)
   */
  getProfesionalesPorNegocio(negocioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/profesionales?negocioId=${negocioId}`);
>>>>>>> origin/abrhyl
  }
}