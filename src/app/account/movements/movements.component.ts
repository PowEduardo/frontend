import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageQuery } from '../../commons/base/model/page-query';
import { PageQueryModel } from '../../commons/base/model/page-query-model';
import { TableComponent } from '../../commons/base/table/table.component';
import { TableColumn } from '../../commons/model/table-column';
import { TableAction } from '../../commons/model/table-action';
import { CrudService } from '../../commons/service/crud.service';
import { NotificationService } from '../../commons/service/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  imports: [CommonModule, TableComponent, RouterOutlet],
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
    { key: 'date', label: 'Data' }
  ];

  /** Movement data for table rendering */
  data: AccountMovementModel[] = [];

  /** Loading flag for async operation */
  loading: boolean = true;

  /** Flag to show/hide table based on active child route */
  isActive: boolean = true;

  /** Table action buttons for edit/delete */
  movementActions: TableAction<AccountMovementModel>[] = [
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
    const query: PageQuery = new PageQueryModel();
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

    this.service.delete(id).subscribe({
      next: () => {
        this.notificationService.success('Movimento deletado com sucesso');
        this.loadMovements();
      },
      error: (error) => {
        this.notificationService.error(`Erro ao deletar movimento: ${error.message}`);
      }
    });
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
}
