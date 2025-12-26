import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PageQuery } from '../../commons/base/model/page-query';
import { PageQueryModel } from '../../commons/base/model/page-query-model';
import { TableComponent } from '../../commons/base/table/table.component';
import { TableAction } from '../../commons/model/table-action';
import { TableColumn } from '../../commons/model/table-column';
import { NotificationService } from '../../commons/service/notification.service';
import { AccountMovementModel } from '../model/account-movement-model';
import { AccountMovementsUpsertComponent } from './account-movements-upsert/account-movements-upsert.component';
import { AccountMovementService } from './service/account-movement-service';

/**
 * Movements List Component for Accounts
 * Displays account movements in a standardized table with CRUD operations.
 * Uses the generic TableComponent pattern for consistency across the application.
 */
@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent, RouterOutlet],
  providers: [
    { provide: AccountMovementService, useClass: AccountMovementService },
    NgbModal
  ],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent implements OnInit, OnDestroy {

  /** Parent account ID to filter movements - can be passed as @Input or extracted from route */
  @Input() parentId: number | null = null;

  /** Table column definitions for display */
  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'description', label: 'Descrição' },
    { key: 'value', label: 'Valor' },
    { key: 'date', label: 'Data' },
    { key: 'paid', label: 'Pago?' }
  ];

  /** Movement data for table rendering */
  data: AccountMovementModel[] = [];

  /** Loading flag for async operation */
  loading: boolean = true;

  /** Flag to show/hide table based on active child route */
  isActive: boolean = true;

  /** Track loading state for individual movements (for spinner during operations) */
  movementLoadingState: Map<number, boolean> = new Map();

  /** Filter: Start date for period filter */
  filterStartDate: string = this.getDefaultStartDate();

  /** Filter: End date for period filter */
  filterEndDate: string = this.getDefaultEndDate();

  /** Pagination: Current page number (0-based) */
  currentPage: number = 0;

  /** Pagination: Items per page */
  itemsPerPage: number = 15;

  /** Pagination: Total number of items */
  totalItems: number = 0;

  /** Pagination: Total pages */
  totalPages: number = 0;

  /** Table action buttons for edit/delete/mark as paid */
  movementActions: TableAction<AccountMovementModel>[] = [
    {
      label: 'Marcar como Pago',
      icon: 'bi bi-check-circle',
      cssClass: 'success',
      action: (movement: AccountMovementModel) => this.markAsPaid(movement.id!)
    },
    {
      label: 'Editar',
      icon: 'bi bi-pencil',
      cssClass: 'primary',
      action: (movement: AccountMovementModel) => this.updateMovement(movement.id!)
    },
    {
      label: 'Deletar',
      icon: 'bi bi-trash',
      cssClass: 'danger',
      action: (movement: AccountMovementModel) => this.deleteMovement(movement.id!)
    }
  ];

  /** Router events subscription */
  private routerSub?: Subscription;

  constructor(
    protected service: AccountMovementService,
    protected notificationService: NotificationService,
    protected modal: NgbModal,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
  }

  /**
   * Component initialization
   * Loads movements and sets up router event listener for child route visibility
   */
  ngOnInit(): void {
    // Extract accountId from parent route if not passed via @Input
    if (!this.parentId) {
      this.route.parent?.paramMap.subscribe(params => {
        const idParam = params.get('accountId');
        if (idParam) {
          this.parentId = parseInt(idParam, 10);
          this.loadMovements();
        }
      });
    } else {
      this.loadMovements();
    }
    
    // Initialize visibility based on whether there is an active child route
    this.isActive = !this.hasActiveChild();

    // Listen to navigation end events to update visibility when child routes activate/deactivate
    this.routerSub = this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.isActive = !this.hasActiveChild();
      }
    });
  }

  /**
   * Cleanup subscriptions on component destroy
   */
  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  /**
   * Load all movements from backend
   * Sets loading flag and handles errors
   */
  private loadMovements(): void {
    this.loading = true;
    // Clear any previous loading states when reloading data
    this.movementLoadingState.clear();
    
    const query: PageQuery = new PageQueryModel();
    query.addQuery("date", this.filterStartDate + ";" + this.filterEndDate);
    query.sort = '-date';

    // Set parent ID on service
    if (this.parentId) {
      this.service.parentId = this.parentId;
    }

    this.service.readAll(query).subscribe({
      next: (data: AccountMovementModel[]) => {
        this.data = data;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error(`Erro ao carregar movimentos: ${error.message}`);
        this.loading = false;
      }
    });
  }

  /**
   * Handle row selection from table
   * Navigates to movement details if implemented
   * 
   * @param movement Selected movement
   */
  onValueSelected(movement: AccountMovementModel): void {
    // Can be extended for navigation to movement details
  }

  /**
   * Open modal to create a new movement
   */
  addMovement(): void {
    const modalRef = this.modal.open(AccountMovementsUpsertComponent, { 
      size: 'lg', 
      centered: true 
    });
    
    // Reload movements after modal closes
    modalRef.result.then(
      () => this.loadMovements(),
      () => {} // Dismiss handler
    );
  }

  /**
   * Open modal to create or update a movement
   * 
   * @param id Movement ID to update (optional)
   */
  private updateMovement(id: number): void {
    const modalRef = this.modal.open(AccountMovementsUpsertComponent, { 
      size: 'lg', 
      centered: true 
    });
    modalRef.componentInstance.setModel(id);
    
    // Reload movements after modal closes
    modalRef.result.then(
      () => this.loadMovements(),
      () => {} // Dismiss handler
    );
  }

  /**
   * Delete a movement with confirmation
   * Reloads table after successful deletion
   * 
   * @param id Movement ID to delete
   */
  private deleteMovement(id: number): void {
    if (!confirm('Tem certeza que deseja deletar este movimento?')) {
      return;
    }

    this.setMovementLoading(id, true);
    this.service.delete(id).subscribe({
      next: () => {
        this.notificationService.success('Movimento deletado com sucesso');
        this.loadMovements();
      },
      error: (error) => {
        this.notificationService.error(`Erro ao deletar movimento: ${error.message}`);
        this.setMovementLoading(id, false);
      }
    });
  }

  /**
   * Mark a movement as paid
   * Updates the movement status to paid and reloads the table
   * 
   * @param id Movement ID to mark as paid
   */
  private markAsPaid(id: number): void {
    this.setMovementLoading(id, true);
    this.service.markAsPaid(id).subscribe({
      next: (updatedMovement) => {
        this.notificationService.success('Movimento marcado como pago');
        this.loadMovements();
      },
      error: (error) => {
        this.notificationService.error(`Erro ao marcar como pago: ${error.message}`);
        this.setMovementLoading(id, false);
      }
    });
  }

  /**
   * Set loading state for a specific movement
   * Used to show/hide spinner for individual row operations
   * 
   * @param movementId Movement ID
   * @param isLoading Loading state
   */
  private setMovementLoading(movementId: number, isLoading: boolean): void {
    this.movementLoadingState.set(movementId, isLoading);
  }

  /**
   * Check if a specific movement is loading
   * 
   * @param movementId Movement ID
   * @returns true if movement is currently loading
   */
  isMovementLoading(movementId: number | null): boolean {
    if (!movementId) return false;
    return this.movementLoadingState.get(movementId) ?? false;
  }

  /**
   * Check if current route has an active child route
   * Used to determine table visibility
   * 
   * @returns true if a child route is active
   */
  private hasActiveChild(): boolean {
    return !!this.route.firstChild;
  }

  /**
   * Get default start date (first day of current month)
   * Format: YYYY-MM-DD
   */
  private getDefaultStartDate(): string {
    const today = new Date();
    const minusMonths = 3;
    if (today.getMonth() < minusMonths) {
      const firstDay = new Date(today.getFullYear()-1, 11 - (minusMonths-today.getMonth()), 1);
      return this.formatDate(firstDay);
    } else {
      const firstDay = new Date(today.getFullYear(), today.getMonth()-minusMonths, 1);
      return this.formatDate(firstDay);
    }
  }

  /**
   * Get default end date (last day of current month)
   * Format: YYYY-MM-DD
   */
  private getDefaultEndDate(): string {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return this.formatDate(lastDay);
  }

  /**
   * Format date to YYYY-MM-DD string
   * @param date Date to format
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Apply filter and reset pagination to page 1
   * Called when user clicks filter button
   */
  applyFilter(): void {
    this.currentPage = 0;
    this.loadMovementsWithPagination();
  }

  /**
   * Load movements with current filter and pagination
   * Handles page query building with filters
   */
  private loadMovementsWithPagination(): void {
    this.loading = true;
    this.movementLoadingState.clear();
    
    const query: PageQuery = new PageQueryModel();
    query.sort = '-date';
    query.addQuery("date", this.filterStartDate + ";" + this.filterEndDate);
    query.offset = this.currentPage;
    query.limit = this.itemsPerPage;

    // TODO: Add date filter query when backend supports it
    // For now, we'll load all and let backend handle pagination

    if (this.parentId) {
      this.service.parentId = this.parentId;
    }

    this.service.readAll(query).subscribe({
      next: (data: AccountMovementModel[]) => {
        this.data = data;
        this.totalItems = data.length; // This will be updated with proper page info from backend
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error(`Erro ao carregar movimentos: ${error.message}`);
        this.loading = false;
      }
    });
  }

  /**
   * Navigate to next page
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadMovementsWithPagination();
    }
  }

  /**
   * Navigate to previous page
   */
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMovementsWithPagination();
    }
  }

  /**
   * Navigate to first page
   */
  firstPage(): void {
    this.currentPage = 0;
    this.loadMovementsWithPagination();
  }

  /**
   * Navigate to last page
   */
  lastPage(): void {
    this.currentPage = this.totalPages - 1;
    this.loadMovementsWithPagination();
  }

  /**
   * Get current page number (1-based for display)
   */
  getCurrentPageNumber(): number {
    return this.currentPage + 1;
  }

  /**
   * Check if can navigate to next page
   */
  canNextPage(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  /**
   * Check if can navigate to previous page
   */
  canPreviousPage(): boolean {
    return this.currentPage > 0;
  }
}
