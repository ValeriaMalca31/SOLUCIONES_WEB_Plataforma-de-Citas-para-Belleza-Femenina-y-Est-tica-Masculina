import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost:8080/api';
=======
  
  // Apuntamos a nuestro backend falso en localhost:3000
  private apiUrl = 'http://localhost:3000';
>>>>>>> origin/abrhyl

  constructor(private http: HttpClient) { }

  /**
<<<<<<< HEAD
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
=======
   * Crea una nueva cita en la base de datos
   * Llama a: POST http://localhost:3000/citas
   * @param datosCita Un objeto con la información de la nueva cita
   */
  crearCita(datosCita: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/citas`, datosCita);
>>>>>>> origin/abrhyl
  }
}