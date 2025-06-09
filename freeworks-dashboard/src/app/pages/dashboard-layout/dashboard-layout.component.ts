import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importa TODOS los componentes del dashboard que usas en su plantilla
import { HeaderComponent } from '../../components/header/header.component';
import { DashboardSummaryComponent } from '../../components/dashboard-summary/dashboard-summary.component';
import { ProjectFiltersComponent } from '../../components/project-filters/project-filters.component';
import { ProjectListComponent } from '../../components/project-list/project-list.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent, // Importa el Header
    DashboardSummaryComponent, // Importa el DashboardSummary
    ProjectFiltersComponent, // Importa el ProjectFilters
    ProjectListComponent // Importa el ProjectList
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

}