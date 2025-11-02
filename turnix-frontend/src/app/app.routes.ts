import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/auth/login/login';
import { NegocioDetail } from './components/negocio-detail/negocio-detail';
import { Booking } from './components/booking/booking';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'negocio/:id', component: NegocioDetail },
  { path: 'booking/:negocioId', component: Booking },
  { path: '**', redirectTo: '' }
];