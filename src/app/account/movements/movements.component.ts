import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Page } from '../../commons/base/model/page';
import { PageQuery } from '../../commons/base/model/page-query';
import { PageQueryModel } from '../../commons/base/model/page-query-model';
import { TableAction } from '../../commons/model/table-action';
import { TableColumn } from '../../commons/model/table-column';
import { NotificationService } from '../../commons/service/notification.service';
import { TablePaginatedComponent } from "../../shared/ui/table-paginated/table-paginated.component";
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
  imports: [CommonModule, FormsModule, RouterOutlet, TablePaginatedComponent],
  providers: [
    { provide: AccountMovementService, useClass: AccountMovementService },
    NgbModal
  ],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent implements OnInit, OnDestroy {
  protected service = inject(AccountMovementService);
  protected notificationService = inject(NotificationService);
  protected modal = inject(NgbModal);
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);


  /** Parent account ID to filter movements - can be passed as @Input or extracted from route */
  @Input() parentId: number | null = null;

  /** Table column definitions for display */
  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'description', label: 'Descrição' },
    {
      key: 'value', label: 'Valor', format: (val: unknown, row: unknown) => {
        const rowData = row as AccountMovementModel;
        return rowData.type === 'DEBIT' ? `R$ -${val}` : `R$ ${val}`;
      }, style: (val: unknown, row: unknown) => {
        const rowData = row as AccountMovementModel;
        return rowData.type === 'DEBIT' ? { color: 'red' } : { color: 'green' };
      }
    },
    { key: 'date', label: 'Data' },
    { key: 'paid', label: 'Pago' }
  ];

  /** Movement data for table rendering */
  data!: Page<AccountMovementModel>;

  /** Loading flag for async operation */
  loading = true;

  /** Flag to show/hide table based on active child route */
  isActive = true;

  /** Track loading state for individual movements (for spinner during operations) */
  movementLoadingState = new Map<number, boolean>();

  /** Filter: Start date for period filter */
  filterStartDate: string = this.getDefaultStartDate();

  /** Filter: End date for period filter */
  filterEndDate: string = this.getDefaultEndDate();

  /** Future movements data for dropdown (Phase 7) */
  futureMovements: AccountMovementModel[] = [];

  /** Loading flag for future movements dropdown */
  loadingFuture = false;

  /** Dropdown visibility for future movements */
  showFutureDropdown = false;

  /** Table action buttons for edit/delete/mark as paid */
  movementActions: TableAction<AccountMovementModel>[] = [
    {
      label: 'Marcar como Pago',
      icon: 'bi bi-check-circle',
      cssClass: 'success',
      action: (movement: AccountMovementModel) => this.markAsPaid(movement.id!)
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
          this.searchData(0);
          this.loadFutureMovements();
        }
      });
    } else {
      this.searchData(0);
      this.loadFutureMovements();
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
   * Load future movements (Phase 7)
   * Loads movements with date greater than today
   */
  private loadFutureMovements(): void {
    if (!(this.filterEndDate === this.formatDate(new Date()))) {
      this.futureMovements = [];
      return;
    }
    this.loadingFuture = true;

    const query: PageQuery = new PageQueryModel();
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    // Load all movements from tomorrow onwards
    query.addQuery("date", today + ";");
    query.sort = 'date';

    // Set parent ID on service
    if (this.parentId) {
      this.service.parentId = this.parentId;
    }

    this.service.readAll(query).subscribe({
      next: (data: AccountMovementModel[]) => {
        this.futureMovements = data;
        this.loadingFuture = false;
      },
      error: (error) => {
        this.notificationService.error(`Erro ao carregar movimentos futuros: ${error.message}`);
        this.loadingFuture = false;
      }
    });
  }

  /**
   * Toggle future movements dropdown visibility
   */
  toggleFutureDropdown(): void {
    this.showFutureDropdown = !this.showFutureDropdown;
  }

  /**
   * Handle row selection from table
   * Navigates to movement details if implemented
   * 
   * @param movement Selected movement
   */
  onValueSelected(movement: AccountMovementModel): void {
    // Can be extended for navigation to movement details
    this.updateMovement(movement.id!);
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
      () => this.searchData(0)
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
      () => this.searchData(0)
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
        this.searchData(0);
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
        this.notificationService.success('Movimento {} marcado como pago'.replace('{}', updatedMovement.id!.toString()));
        this.searchData(this.data.number);
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
    let year: number;
    let month: number;
    const day = 1;
    const minusMonths = 1;
    if (today.getMonth() < minusMonths) {
      year = today.getFullYear() - 1;
      month = 11;
    } else {
      year = today.getFullYear();
      month = today.getMonth() - minusMonths;
    }
    return this.formatDate(new Date(year, month, day));
  }

  /**
   * Get default end date (last day of current month)
   * Format: YYYY-MM-DD
   */
  private getDefaultEndDate(): string {
    return this.formatDate(new Date());
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

  searchData(page: number): void {
    this.loadFutureMovements();
    this.loading = true;
    this.movementLoadingState.clear();

    const query: PageQuery = new PageQueryModel();
    query.sort = '-date';
    query.addQuery("date", this.filterStartDate + ";" + this.filterEndDate);
    query.offset = page;

    if (this.parentId) {
      this.service.parentId = this.parentId;
    }

    this.service.search(query).subscribe({
      next: (data: Page<AccountMovementModel>) => {
        this.data = data;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error(`Erro ao carregar movimentos: ${error.message}`);
        this.loading = false;
      }
    });
  }
}
