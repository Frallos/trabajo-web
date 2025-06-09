import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-filters.component.html',
  styleUrls: ['./project-filters.component.scss']
})
export class ProjectFiltersComponent implements OnChanges {
  @Input() clients: string[] = [];
  @Input() activeTab: string = 'Todos';

  searchName: string = '';
  filterClient: string = '';
  filterStatus: string = '';
  filterPriority: string = '';

  @Output() filtersApplied = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeTab'] && changes['activeTab'].currentValue) {
      this.activeTab = changes['activeTab'].currentValue;
    }
  }

  applyFilters() {
    this.filtersApplied.emit({
      name: this.searchName,
      client: this.filterClient,
      status: this.filterStatus,
      priority: this.filterPriority,
      activeTab: this.activeTab
    });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    this.applyFilters();
  }

  resetFilters() {
    this.searchName = '';
    this.filterClient = '';
    this.filterStatus = '';
    this.filterPriority = '';
    this.activeTab = 'Todos';
    this.applyFilters();
  }
}
