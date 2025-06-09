import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() pendingProjects: any[] = [];
  @Output() proyectosClicked = new EventEmitter<void>();
  @Output() filterPending = new EventEmitter<void>();  // Evento para filtro Pendiente
  @Output() proyectoSelected = new EventEmitter<number>();
  dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  scrollToProject(projectId: number) {
    this.filterPending.emit(); // Emitir para activar filtro Pendiente
    const element = document.getElementById(`project-${projectId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    this.dropdownOpen = false;
  }

  onProyectosClick() {
    this.proyectosClicked.emit();
  }

  onPendingProjectClick(projectId: number) {
    this.proyectoSelected.emit(projectId);
}
}
