<<<<<<< HEAD
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
=======
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router'; 
import { ServicioService } from '../../services/servicio.service';
import { ProfesionalService } from '../../services/profesional.service';
import { DisponibilidadService } from '../../services/disponibilidad.service';
import { CitaService } from '../../services/cita.service';
>>>>>>> origin/abrhyl

@Component({
  selector: 'app-booking',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule],
  template: `
    <div style="padding: 2rem; text-align: center;">
      <h1>Reservar Cita</h1>
      <p>Este componente será implementado por tu compañero</p>
    </div>
  `
})
export class Booking {
  constructor() {}
=======
  imports: [CommonModule, NgIf, NgFor, FormsModule], 
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class Booking implements OnInit {
  
  // Datos generales
  negocioId: number = 0;
  servicios: any[] = [];
  profesionales: any[] = [];
  horariosDisponibles: string[] = [];
  
  // Estado del flujo
  currentStep: number = 1; // 1=Servicio, 2=Agendar, 3=Confirmar, 4=Éxito
  
  // Reserva en progreso
  servicioSeleccionado: any = null;
  profesionalSeleccionado: number | null = null;
  profesionalSeleccionadoObj: any = null; // Para guardar el objeto completo del profesional
  fechaSeleccionada: string = '';
  horaSeleccionada: string | null = null;

  // Datos del formulario del Paso 3
  clienteNombre: string = '';
  clienteEmail: string = '';
  clienteTelefono: string = '';
  clienteNotas: string = '';

  // Estados de carga y error
  cargandoHorarios: boolean = false;
  errorHorarios: string | null = null;
  estaGuardando: boolean = false;
  errorAlGuardar: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router, // <-- ¡Inyectado!
    private servicioService: ServicioService,
    private profesionalService: ProfesionalService,
    private disponibilidadService: DisponibilidadService,
    private citaService: CitaService // <-- ¡Inyectado!
  ) {}

  ngOnInit(): void {
    this.negocioId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.servicioService.getServiciosPorNegocio(this.negocioId).subscribe(data => {
      this.servicios = data;
    });
  }

  seleccionarServicio(servicio: any): void {
    this.servicioSeleccionado = servicio;
    this.currentStep = 2; // Avanza al Paso 2
    this.cargarProfesionales();
  }

  cargarProfesionales(): void {
    this.profesionalService.getProfesionalesPorNegocio(this.negocioId).subscribe(data => {
      this.profesionales = data;
    });
  }

  buscarDisponibilidad(): void {
    this.horariosDisponibles = [];
    this.horaSeleccionada = null;
    this.errorHorarios = null;

    // Guardamos el objeto completo del profesional para mostrarlo en el resumen
    this.profesionalSeleccionadoObj = this.profesionales.find(p => p.id === this.profesionalSeleccionado) || null;

    if (this.profesionalSeleccionado && this.fechaSeleccionada && this.servicioSeleccionado) {
      this.cargandoHorarios = true;
      const profesionalId = this.profesionalSeleccionado;
      const duracion = this.servicioSeleccionado.duracionEstimada; 

      this.disponibilidadService.getHorariosDisponibles(profesionalId, this.fechaSeleccionada, duracion)
        .subscribe({
          next: (horarios) => {
            this.horariosDisponibles = horarios;
            if (horarios.length === 0) {
              this.errorHorarios = 'No hay horarios disponibles para esta fecha.';
            }
            this.cargandoHorarios = false;
          },
          error: (err) => {
            console.error('Error al buscar disponibilidad:', err);
            this.errorHorarios = 'Error al cargar los horarios. Intente más tarde.';
            this.cargandoHorarios = false;
          }
        });
    }
  }

  seleccionarHora(hora: string): void {
    this.horaSeleccionada = hora;
  }

  //Esta función ahora avanza al Paso 3
  continuarReserva(): void {
    this.currentStep = 3; // Avanza al Paso 3 (Confirmar Reserva)
  }

  // Se llama al hacer clic en "Confirmar Cita" en el Paso 3
  finalizarReserva(): void {
    if (!this.validarFormulario()) {
      this.errorAlGuardar = 'Por favor, complete todos los campos obligatorios.';
      return;
    }
    
    this.estaGuardando = true;
    this.errorAlGuardar = null;

    // 1. Construir la fecha y hora de inicio/fin
    const [horas, minutos] = this.horaSeleccionada!.split(':').map(Number);
    const fechaHoraInicio = new Date(this.fechaSeleccionada + 'T00:00:00');
    fechaHoraInicio.setHours(horas, minutos);

    const fechaHoraFin = new Date(fechaHoraInicio.getTime() + this.servicioSeleccionado.duracionEstimada * 60000);

    // 2. Crear el objeto Cita (como en json-server)
    const nuevaCita = {
      // Asumimos un clienteId temporal (ej. 3) ya que no tenemos login
      // En un proyecto real, esto vendría del usuario logueado
      clienteId: 3, 
      negocioId: this.negocioId,
      profesionalId: this.profesionalSeleccionado,
      servicioId: this.servicioSeleccionado.id,
      fechaHoraInicio: fechaHoraInicio.toISOString(),
      fechaHoraFin: fechaHoraFin.toISOString(),
      estado: "Pendiente", // O "Confirmada"
      precioFinal: this.servicioSeleccionado.precio,
      // Datos del cliente (no están en tu DER de Cita, pero los guardamos por si acaso)
      // Lo ideal sería que la API guarde esto en la tabla "Usuario" si no existe
      // Por ahora, tu API de json-server los ignorará, pero está bien.
      clienteNombre: this.clienteNombre,
      clienteEmail: this.clienteEmail,
      clienteTelefono: this.clienteTelefono,
      clienteNotas: this.clienteNotas
    };

    // 3. Llamar al servicio para guardar
    this.citaService.crearCita(nuevaCita).subscribe({
      next: (citaGuardada) => {
        this.estaGuardando = false;
        this.currentStep = 4; // ¡Avanza al Paso 4 (Éxito)!
        console.log('¡Cita guardada!', citaGuardada);
      },
      error: (err) => {
        console.error('Error al guardar la cita:', err);
        this.estaGuardando = false;
        this.errorAlGuardar = 'Hubo un error al confirmar tu cita. Inténtalo de nuevo.';
      }
    });
  }

  // Validación simple
  validarFormulario(): boolean {
    if (!this.clienteNombre || !this.clienteEmail || !this.clienteTelefono) {
      return false;
    }
    return true;
  }

  //  Para el botón de "Volver al inicio" en el Paso 4
  volverAlInicio(): void {
    this.router.navigate(['/']); // Navega a la página principal
  }
>>>>>>> origin/abrhyl
}