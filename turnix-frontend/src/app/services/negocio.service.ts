import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  /**
   * Esta es la URL de tu backend FALSO (json-server).
   * Habla con http://localhost:3000
   */
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos de UN SOLO negocio por su ID.
   * Llama a: GET http://localhost:3000/negocios/1
   */
  getNegocioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/negocios/${id}`);
  }

  /**
   * ¡ESTA ES LA FUNCIÓN QUE FALTABA!
   * Obtiene las fotos de la galería de UN SOLO negocio.
   * Llama a: GET http://localhost:3000/galeriasNegocio?negocioId=1
   */
  getGaleriaPorNegocio(negocioId: number): Observable<any[]> {
    // Usamos ?negocioId= para "filtrar" las fotos por el ID del negocio
    return this.http.get<any[]>(`${this.apiUrl}/galeriasNegocio?negocioId=${negocioId}`);
  }
}