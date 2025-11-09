import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  
  // Apuntamos a nuestro backend falso en localhost:3000
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Crea una nueva cita en la base de datos
   * Llama a: POST http://localhost:3000/citas
   * @param datosCita Un objeto con la información de la nueva cita
   */
  crearCita(datosCita: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/citas`, datosCita);
  }
}