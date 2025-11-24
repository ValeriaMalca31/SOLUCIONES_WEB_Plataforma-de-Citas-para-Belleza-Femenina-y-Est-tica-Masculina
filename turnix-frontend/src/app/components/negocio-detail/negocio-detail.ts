import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NegocioService, Negocio, Servicio, Profesional, Galeria, Resena, CitaRequest } from '../../services/negocio.service';

@Component({
  selector: 'app-negocio-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './negocio-detail.html',
  styleUrls: ['./negocio-detail.css']
})
export class NegocioDetail implements OnInit {
  negocio: Negocio | null = null;
  servicios: Servicio[] = [];
  profesionales: Profesional[] = [];
  galeria: Galeria[] = [];
  resenas: Resena[] = [];
  
  // Modal y Pasos
  modalAbierto = false;
  pasoActual = 1;
  loading = true;

  // Selección de Reserva
  servicioSeleccionado: Servicio | null = null;
  profesionalSeleccionado: Profesional | null = null;
  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';

  // Datos Mock para horarios (se pueden reemplazar por API real de disponibilidad)
  horariosDisponibles: string[] = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private negocioService: NegocioService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.cargarDatosNegocio(id);
    }
  }

  cargarDatosNegocio(id: number) {
    this.loading = true;
    
    // 1. Cargar Negocio
    this.negocioService.getNegocio(id).subscribe(data => {
      this.negocio = data;
    });

    // 2. Cargar Servicios
    this.negocioService.getServicios(id).subscribe(data => this.servicios = data);

    // 3. Cargar Galería (Corrección de ruta de imagen si es necesario)
    this.negocioService.getGaleria(id).subscribe(data => {
      this.galeria = data.map(img => ({
        ...img,
        // Aseguramos que la ruta apunte a la carpeta public/resources/static/
        urlImagen: img.urlImagen.startsWith('/') ? img.urlImagen : `/resources/static/${img.urlImagen}`
      }));
    });

    // 4. Cargar Reseñas
    this.negocioService.getResenas(id).subscribe(data => this.resenas = data);

    // 5. Cargar Profesionales
    this.negocioService.getProfesionales(id).subscribe(data => this.profesionales = data);

    this.loading = false;
  }

  // --- Helpers Visuales ---
  generarEstrellas(calificacion: number): number[] {
    // Retorna un array para iterar en el HTML (ej: 4 estrellas -> [1,1,1,1,0])
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(i <= calificacion ? 1 : 0);
    }
    return estrellas;
  }

  get totalEstimado(): number {
    return this.servicioSeleccionado ? this.servicioSeleccionado.precio : 0;
  }

  // --- Lógica del Modal ---
  abrirReserva() { this.modalAbierto = true; this.pasoActual = 1; this.limpiarSeleccion(); }
  cerrarReserva() { this.modalAbierto = false; }
  
  limpiarSeleccion() {
    this.servicioSeleccionado = null;
    this.profesionalSeleccionado = null;
    this.fechaSeleccionada = '';
    this.horaSeleccionada = '';
  }

  seleccionarServicio(s: Servicio) { this.servicioSeleccionado = s; }
  seleccionarProfesional(p: Profesional) { this.profesionalSeleccionado = p; this.siguientePaso(); }
  seleccionarHora(h: string) { this.horaSeleccionada = h; }

  siguientePaso() { if (this.pasoActual < 4) this.pasoActual++; }
  pasoAnterior() { if (this.pasoActual > 1) this.pasoActual--; }

  confirmarCita() {
    if (!this.negocio || !this.servicioSeleccionado || !this.profesionalSeleccionado || !this.fechaSeleccionada || !this.horaSeleccionada) return;

    const inicio = `${this.fechaSeleccionada}T${this.horaSeleccionada}:00`;
    const fin = inicio; // Simplificado

    const request: CitaRequest = {
      clienteId: 1, // Usuario hardcodeado por ahora
      negocioId: this.negocio.id,
      profesionalId: this.profesionalSeleccionado.id,
      servicioId: this.servicioSeleccionado.id,
      fechaHoraInicio: inicio,
      fechaHoraFin: fin,
      estado: 'PENDIENTE',
      precioFinal: this.servicioSeleccionado.precio,
      notasPromocion: 'Reserva Web'
    };

    this.negocioService.crearCita(request).subscribe({
      next: () => {
        alert('¡Cita Confirmada Exitosamente!');
        this.cerrarReserva();
      },
      error: (err) => alert('Error al reservar.')
    });
  }
}