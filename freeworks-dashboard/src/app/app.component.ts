// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // ¡IMPORTA ESTO!

// Si estás usando los componentes de dashboard directamente, asegúrate de que estén importados.
// Aunque para las pruebas de login/registro, no son estrictamente necesarios para el app.component.
import { HeaderComponent } from './components/header/header.component';
import { DashboardSummaryComponent } from './components/dashboard-summary/dashboard-summary.component';
import { ProjectFiltersComponent } from './components/project-filters/project-filters.component';
import { ProjectListComponent } from './components/project-list/project-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule, // ¡Añádelo aquí si no está!
    HeaderComponent, // Asegúrate de que estos estén si los usas en app.component.html
    DashboardSummaryComponent,
    ProjectFiltersComponent,
    ProjectListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'freeworks-dashboard';
}