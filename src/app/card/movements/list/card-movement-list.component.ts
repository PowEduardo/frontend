import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardMovementModel } from '../model/card-movement-model';
import { CardMovementService } from '../service/card-movement.service';
import { PageQuery } from '../../../commons/base/model/page-query';
import { Page } from '../../../commons/base/model/page';
import { NotificationService } from '../../../commons/service/notification.service';
import { TableComponent } from '../../../commons/base/table/table.component';
import { TableColumn } from '../../../commons/model/table-column';
import { TableAction } from '../../../commons/model/table-action';

/**
 * Card Movement List Component
 * Displays a list of unpaid card movements with filtering and sorting options.
 * Allows editing individual movements.
 */
@Component({
  selector: 'app-card-movement-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent],
  templateUrl: './card-movement-list.component.html',
  styleUrls: ['./card-movement-list.component.css']
})
export class CardMovementListComponent implements OnInit {
  movements: CardMovementModel[] = [];
  loading: boolean = true;
  totalUnpaid: number = 0;
  cardId: number = 0;

  filter: string = 'unpaid';
  sortBy: string = '-date';

  // Table configuration
  movementColumns: TableColumn[] = [
    { label: 'Data', key: 'date', format: (value: unknown) => new Date(value as string | Date).toLocaleDateString('pt-BR') },
    { label: 'Valor', key: 'value', format: (value: unknown) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { label: 'Descrição', key: 'description', format: (value: unknown) => (value as string | null | undefined) || '-' },
    { label: 'Parcela', key: 'installment', format: (value: unknown) => value ? `${value}/${value}` : '-' },
    { label: 'Status', key: 'paid', format: (value: unknown) => value ? '✓ Pago' : '○ Aberto' }
  ];

  movementActions: TableAction<CardMovementModel>[] = [
    {
      label: 'Editar',
      icon: 'bi bi-pencil',
      cssClass: 'primary',
      action: (movement: CardMovementModel) => this.editMovement(movement)
    }
  ];

  constructor(
    private movementService: CardMovementService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.cardId = params['cardId'];
      this.movementService.parentId = this.cardId;
      this.loadMovements();
    });
  }

  /**
   * Load movements based on current filter
   */
  loadMovements(): void {
    this.loading = true;
    const pageQuery = new PageQuery();
    pageQuery.limit = 100;
    pageQuery.sort = this.sortBy;

    if (this.filter === 'unpaid') {
      this.movementService.getUnpaidMovements(pageQuery).subscribe({
        next: (page: Page<CardMovementModel>) => {
          this.movements = page.content;
          this.calculateTotalUnpaid();
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.notificationService.error('Erro ao carregar movimentos');
        }
      });
    } else {
      this.movementService.searchMovements(pageQuery).subscribe({
        next: (page: Page<CardMovementModel>) => {
          this.movements = page.content;
          this.calculateTotalUnpaid();
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.notificationService.error('Erro ao carregar movimentos');
        }
      });
    }
  }

  /**
   * Calculate total of unpaid movements
   */
  private calculateTotalUnpaid(): void {
    this.totalUnpaid = this.movements
      .filter(m => !m.paid)
      .reduce((sum, m) => sum + m.value, 0);
  }

  /**
   * Apply filter and reload
   */
  applyFilter(): void {
    this.loadMovements();
  }

  /**
   * Apply sort and reload
   */
  applySort(): void {
    this.loadMovements();
  }

  /**
   * Navigate to edit movement
   */
  editMovement(movement: CardMovementModel): void {
    this.router.navigate([`/cards/${this.cardId}/movements/${movement.id}/edit`]);
  }
}
