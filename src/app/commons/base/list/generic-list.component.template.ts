/**
 * GENERIC LIST COMPONENT TEMPLATE
 * 
 * Use este arquivo como base para criar List components em qualquer feature.
 * Exemplos: AccountListComponent, VehicleListComponent, InvestmentListComponent
 * 
 * Passos:
 * 1. Copiar este arquivo
 * 2. Trocar "Card" por sua entidade (ex: "Account")
 * 3. Trocar "CardDTO" e "CardService" pelos seus tipos/serviços
 * 4. Ajustar columns[] conforme seus dados
 * 5. Ajustar actions[] com as ações que sua entidade precisa
 */

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageQuery } from '../model/page-query';
import { TableComponent } from '../table/table.component';
import { TableAction } from '../../model/table-action';
import { TableColumn } from '../../model/table-column';
import { NotificationService } from '../../service/notification.service';

/**
 * Generic List Component Template
 * Replace <YourEntity> with your actual entity type
 * Replace <YourService> with your actual service
 */
@Component({
  selector: 'app-your-entity-list',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <div class="container-fluid mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>{{ title }}</h2>
        <button class="btn btn-primary" (click)="onCreate()">
          <i class="bi bi-plus-lg me-2"></i> New {{ entityName }}
        </button>
      </div>

      @if (loading) {
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      } @else if (items.length > 0) {
        <app-table 
          [columns]="columns"
          [data]="items"
          [actions]="itemActions"
          (rowSelected)="onRowSelect($event)">
        </app-table>
      } @else {
        <div class="alert alert-info">No {{ entityName }}s found.</div>
      }
    </div>
  `
})
export class YourEntityListComponent implements OnInit {
  // Configuration
  title = 'Your Entities';
  entityName = 'Entity';
  
  // Data
  items: unknown[] = [];
  loading = false;

  // Table configuration
  columns: TableColumn[] = [
    { label: 'Name', key: 'name' },
    { label: 'Created', key: 'createDate', format: (v: unknown) => new Date(v as Date).toLocaleDateString() }
    // Add more columns as needed
  ];

  itemActions: TableAction[] = [
    {
      label: 'Edit',
      icon: 'bi bi-pencil',
      cssClass: 'primary',
      action: (item) => this.onEdit(item)
    },
    {
      label: 'Delete',
      icon: 'bi bi-trash',
      cssClass: 'danger',
      action: (item) => this.onDelete(item)
    }
  ];

  constructor(
    // Inject your service here
    // private yourService: YourService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  /**
   * Load items from backend.
   */
  load(): void {
    this.loading = true;
    const query = new PageQuery();
    
    // TODO: Call your service
    // this.yourService.search(query).subscribe({
    //   next: (page: Page<YourDTO>) => {
    //     this.items = page.content;
    //     this.notificationService.success(`Loaded ${this.items.length} item(s)`);
    //   },
    //   error: () => { this.loading = false; },
    //   complete: () => { this.loading = false; }
    // });
  }

  /**
   * Handle row selection.
   */
  onRowSelect(item: unknown): void {
  }

  /**
   * Handle create action.
   */
  onCreate(): void {
    this.notificationService.info('Create feature coming soon');
    // TODO: Open create modal/form
  }

  /**
   * Handle edit action.
   */
  onEdit(item: any): void {
    this.notificationService.info(`Editing: ${item.name}`);
    // TODO: Open edit modal/form
  }

  /**
   * Handle delete action.
   */
  onDelete(item: any): void {
    if (confirm(`Delete "${item.name}"?`)) {
      // TODO: Call service.delete(item.id)
      this.notificationService.success(`Deleted successfully`);
      this.load();
    }
  }
}
