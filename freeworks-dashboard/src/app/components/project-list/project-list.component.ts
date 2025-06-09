import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectCardComponent } from '../project-card/project-card.component';
import { ProjectFiltersComponent } from '../project-filters/project-filters.component';
import { DashboardSummaryComponent } from '../dashboard-summary/dashboard-summary.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProjectCardComponent,
    ProjectFiltersComponent,
    DashboardSummaryComponent,
    HeaderComponent
  ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  filteredProjects: any[] = [];

  newProjectName: string = '';
  newProjectClient: string = '';
  newProjectPriority: string = 'Media';

  clientList: string[] = [];

  currentFilters: any = {
    name: '',
    client: '',
    status: '',
    priority: '',
    activeTab: 'Todos'
  };

  ngOnInit() {
    const stored = localStorage.getItem('projects');
    if (stored) {
      this.projects = JSON.parse(stored);
    } else {
      this.projects = [
        {
          id: 1,
          name: 'Plataforma E-commerce',
          client: 'Cliente Alfa',
          priority: 'Alta',
          status: 'En Progreso',
          progress: 50,
          comments: [
            { text: 'Me gusta el avance, revisar colores.', date: '2025-05-02' }
          ],
          isDelayed: false
        },
        {
          id: 2,
          name: 'App Móvil Fitness',
          client: 'Cliente Beta',
          priority: 'Media',
          status: 'Pendiente',
          progress: 0,
          comments: [],
          isDelayed: true
        }
      ];
      localStorage.setItem('projects', JSON.stringify(this.projects));
    }
    this.updateClientList();
    this.applyFilters(this.currentFilters);
  }

  updateClientList() {
    this.clientList = Array.from(new Set(this.projects.map(p => p.client)));
  }

  createProject() {
    if (!this.newProjectName.trim() || !this.newProjectClient.trim()) {
      alert('Por favor ingresa nombre y cliente del proyecto.');
      return;
    }

    const newId = this.projects.length ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;

    const newProject = {
      id: newId,
      name: this.newProjectName.trim(),
      client: this.newProjectClient.trim(),
      priority: this.newProjectPriority,
      status: 'Pendiente',
      progress: 0,
      comments: [],
      isDelayed: false
    };

    this.projects = [...this.projects, newProject];
    localStorage.setItem('projects', JSON.stringify(this.projects));
    this.updateClientList();
    this.applyFilters(this.currentFilters);

    this.newProjectName = '';
    this.newProjectClient = '';
    this.newProjectPriority = 'Media';
  }

  removeProject(id: number) {
    this.projects = this.projects.filter(p => p.id !== id);
    localStorage.setItem('projects', JSON.stringify(this.projects));
    this.updateClientList();
    this.applyFilters(this.currentFilters);
  }

  updateProject(updatedProject: any) {
    const index = this.projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      this.projects = [
        ...this.projects.slice(0, index),
        updatedProject,
        ...this.projects.slice(index + 1)
      ];
      localStorage.setItem('projects', JSON.stringify(this.projects));
      this.updateClientList();
      this.applyFilters(this.currentFilters);
    }
  }

  onFiltersApplied(filters: any) {
    this.currentFilters = filters;
    this.applyFilters(filters);
  }

  applyFilters(filters: any) {
    const name = filters.name?.toLowerCase() || '';
    const client = filters.client;
    const priority = filters.priority;
    const selectedStatus = filters.status;
    const activeTab = filters.activeTab;

    const statusMapping: Record<string, string> = {
      'Activo': 'En Progreso',
      'Pendiente': 'Pendiente',
      'Entregado': 'Finalizado'
    };

    let statusFilter = '';

    if (selectedStatus) {
      statusFilter = statusMapping[selectedStatus] || selectedStatus;
    } else if (activeTab && activeTab !== 'Todos') {
      statusFilter = statusMapping[activeTab] || activeTab;
    }

    this.filteredProjects = this.projects.filter(project => {
      return (
        (!name || project.name.toLowerCase().includes(name)) &&
        (!client || project.client === client) &&
        (!priority || project.priority === priority) &&
        (!statusFilter || project.status === statusFilter)
      );
    });
  }

  get pendingProjects() {
    return this.projects.filter(p => p.status === 'Pendiente');
  }

  selectTab(tab: string) {
    this.currentFilters.activeTab = tab;
    this.currentFilters.status = ''; // Limpiamos status para que activeTab tome prioridad
    this.applyFilters(this.currentFilters);
  }

  showAllProjectsAndScroll() {
    this.selectTab('Todos');  // Cambia la pestaña activa a 'Todos'
    const el = document.getElementById('project-list');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onFilterPending() {
    this.currentFilters.activeTab = 'Pendiente';
    this.applyFilters(this.currentFilters);
    setTimeout(() => {
      const el = document.getElementById('project-list');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  filterAndScrollToProject(projectId: number) {
    // Cambiamos pestaña y filtros para mostrar pendientes
    this.currentFilters.activeTab = 'Pendiente';
    this.currentFilters.status = ''; // Limpiamos status para que activeTab tome prioridad
    this.applyFilters(this.currentFilters);

    // Esperamos que Angular renderice la lista filtrada
    setTimeout(() => {
      // Hacemos scroll al proyecto específico
      const el = document.getElementById('project-' + projectId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Opcional: resaltado temporal para mejor visualización
        el.classList.add('highlight');
        setTimeout(() => el.classList.remove('highlight'), 2000);
      }
    }, 200);
  }
}
