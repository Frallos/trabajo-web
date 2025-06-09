import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.scss']
})
export class DashboardSummaryComponent implements OnChanges {
  @Input() projects: any[] = [];

  totalProjects: number = 0;
  activeCount: number = 0;
  deliveredCount: number = 0;
  pendingCount: number = 0;
  delayedCount: number = 0;

  ngOnChanges() {
    this.calculateCounts();
  }

  calculateCounts() {
    this.totalProjects = this.projects.length;
    this.activeCount = this.projects.filter(p => p.status === 'En Progreso').length;
    this.deliveredCount = this.projects.filter(p => p.status === 'Finalizado').length;
    this.pendingCount = this.projects.filter(p => p.status === 'Pendiente').length;
    this.delayedCount = this.projects.filter(p => p.isDelayed === true).length;
  }
}
