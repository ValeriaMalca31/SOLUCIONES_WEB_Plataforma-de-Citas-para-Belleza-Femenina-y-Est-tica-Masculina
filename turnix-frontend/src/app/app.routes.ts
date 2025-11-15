import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { NegocioDetail } from './components/negocio-detail/negocio-detail';
import { Booking } from './components/booking/booking';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'registro', component: Register },
  { path: 'negocio/:id', component: NegocioDetail },
  { path: 'booking/:negocioId', component: Booking, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];