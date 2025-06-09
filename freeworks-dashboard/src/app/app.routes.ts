// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component'; // ¡NUEVO! Importa el componente de registro
import { DashboardLayoutComponent } from './pages/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // ¡NUEVO! Ruta para el registro
  { path: 'dashboard', component: DashboardLayoutComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];