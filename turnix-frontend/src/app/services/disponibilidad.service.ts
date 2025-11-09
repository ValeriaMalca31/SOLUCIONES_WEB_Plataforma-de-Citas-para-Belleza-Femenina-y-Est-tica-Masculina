import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {
  private apiUrl = 'http://localhost:3000'; // URL de tu json-server

  constructor(private http: HttpClient) { }

  // 1. Busca el horario de trabajo (ej. Lunes 9-5)
  private getHorarioSemanal(profesionalId: number, diaSemana: number): Observable<any> {
    // diaSemana: JS da 0=Domingo, 1=Lunes. Nuestro JSON es 1=Lunes, 2=Martes...
    // Si es Domingo (0), lo cambiamos a 7 (asumiendo que en tu JSON Domingo es 7, o simplemente no habrá)
    const diaJson = diaSemana === 0 ? 7 : diaSemana;
    
    return this.http.get<any[]>(`${this.apiUrl}/disponibilidadesSemanal?profesionalId=${profesionalId}&diaSemana=${diaJson}`)
      .pipe(
        map(resp => resp.length > 0 ? resp[0] : null) // Devuelve el primer horario que coincida, o null
      );
  }

  // 2. Busca las citas ya agendadas para ESE día
  private getCitasEnFecha(profesionalId: number, fecha: string): Observable<any[]> {
    // Busca citas que comiencen en esa fecha
    return this.http.get<any[]>(`${this.apiUrl}/citas?profesionalId=${profesionalId}&fechaHoraInicio_like=^${fecha}`);
  }

  // 3. ¡LA MAGIA! Calcula los horarios libres
  getHorariosDisponibles(profesionalId: number, fecha: string, duracionServicio: number): Observable<string[]> {
    const fechaObj = new Date(fecha + 'T00:00:00'); // Asegura que la fecha se interprete localmente
    const diaSemana = fechaObj.getDay(); // 0=Domingo, 1=Lunes...

    return this.getHorarioSemanal(profesionalId, diaSemana).pipe(
      switchMap(horario => {
        // Si no hay horario de trabajo para ese día (ej. no trabaja, o es Domingo)
        if (!horario) {
          return of([]); // Devuelve un array vacío
        }

        // Si hay horario, busca las citas agendadas
        return this.getCitasEnFecha(profesionalId, fecha).pipe(
          map(citasAgendadas => {
            return this.calcularSlots(horario.horaInicio, horario.horaFin, duracionServicio, citasAgendadas);
          })
        );
      })
    );
  }

  // 4. Función interna para generar y filtrar slots
  private calcularSlots(horaInicio: string, horaFin: string, duracion: number, citas: any[]): string[] {
    const slotsDisponibles: string[] = [];
    const [inicioH, inicioM] = horaInicio.split(':').map(Number);
    const [finH, finM] = horaFin.split(':').map(Number);

    const fechaBase = new Date();
    fechaBase.setHours(inicioH, inicioM, 0, 0);

    const fechaFin = new Date();
    fechaFin.setHours(finH, finM, 0, 0);

    // Itera mientras la hora de inicio del slot sea menor que la hora de fin
    while (fechaBase.getTime() < fechaFin.getTime()) {
      const horaSlotInicio = fechaBase.getTime();
      const horaSlotFin = horaSlotInicio + duracion * 60000; // Duración en milisegundos

      // Si el slot termina después de la hora de cierre, no se agrega
      if (horaSlotFin > fechaFin.getTime()) {
        break;
      }

      // Revisa si el slot se superpone con una cita existente
      let hayConflicto = false;
      for (const cita of citas) {
        const citaInicio = new Date(cita.fechaHoraInicio).getTime();
        const citaFin = new Date(cita.fechaHoraFin).getTime();

        // Lógica de superposición
        if (horaSlotInicio < citaFin && horaSlotFin > citaInicio) {
          hayConflicto = true;
          break;
        }
      }

      // Si no hay conflicto, se agrega el slot a la lista
      if (!hayConflicto) {
        const horaStr = fechaBase.toTimeString().substring(0, 5); // Formato "HH:mm"
        slotsDisponibles.push(horaStr);
      }

      // Avanza al siguiente slot (basado en la duración del servicio)
      fechaBase.setMinutes(fechaBase.getMinutes() + duracion);
    }

    return slotsDisponibles;
  }
}