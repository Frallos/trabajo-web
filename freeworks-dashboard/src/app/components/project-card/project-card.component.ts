import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent implements OnInit {
  @Input() project: any;
  @Output() deleteProject = new EventEmitter<number>();
  @Output() projectUpdated = new EventEmitter<any>();

  editingProject: any;
  newComment: string = '';

  ngOnInit() {
    this.editingProject = JSON.parse(JSON.stringify(this.project));
    this.updateProgressFromStatus();
  }

  onStatusChange() {
    this.updateProgressFromStatus();
  }

  updateProgressFromStatus() {
    switch (this.editingProject.status) {
      case 'Pendiente':
        this.editingProject.progress = 0;
        break;
      case 'En Progreso':
        this.editingProject.progress = 50;
        break;
      case 'Finalizado':
        this.editingProject.progress = 100;
        break;
    }
  }

  addComment() {
    if (this.newComment.trim()) {
      this.editingProject.comments.push({
        text: this.newComment.trim(),
        date: new Date().toISOString().split('T')[0]
      });
      this.newComment = '';
    }
  }

  removeComment(index: number) {
    this.editingProject.comments.splice(index, 1);
  }

  applyChanges() {
    let storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const index = storedProjects.findIndex((p: any) => p.id === this.project.id);

    if (index !== -1) {
      storedProjects[index] = this.editingProject;
      localStorage.setItem('projects', JSON.stringify(storedProjects));
      alert('Proyecto actualizado exitosamente');
      this.project = JSON.parse(JSON.stringify(this.editingProject));
      this.projectUpdated.emit(this.project);
    }
  }

  onDeleteClick() {
    if (confirm(`¿Eliminar proyecto "${this.project.name}"?`)) {
      this.deleteProject.emit(this.project.id);
    }
  }
}
