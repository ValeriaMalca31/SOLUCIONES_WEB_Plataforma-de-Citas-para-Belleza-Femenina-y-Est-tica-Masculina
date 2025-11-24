import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/auth/login/login';
import { NegocioDetail } from './components/negocio-detail/negocio-detail';
import { Booking } from './components/booking/booking';
import { Dashboard } from './components/dashboard/dashboard';
import { GestionServiciosComponent } from './components/dashboard/gestion-servicios/gestion-servicios';
//Import other dashboard components as needed:
import { GestionCitasComponent } from './components/dashboard/gestion-citas/gestion-citas';
import { GestionPromocionesComponent } from './components/dashboard/gestion-promociones/gestion-promociones';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'negocio/:id', component: NegocioDetail },
  { path: 'booking/:id', component: Booking },
  {
    path: 'dashboard/:negocioId',
    component: Dashboard,
    children: [
      { path: 'servicios', component: GestionServiciosComponent },
      { path: 'citas', component: GestionCitasComponent },
       { path: 'promociones', component: GestionPromocionesComponent },
      { path: '', redirectTo: 'servicios', pathMatch: 'full' } // Default child route
    ]
  },
  { path: '**', redirectTo: '' }
];