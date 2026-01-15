import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../../commons/base/model/page-query';
import { TableComponent } from '../../../commons/base/table/table.component';
import { TableColumn } from '../../../commons/model/table-column';
import { TableAction } from '../../../commons/model/table-action';
import { AssetMovementUpsertComponent } from '../modal/add-movement/asset-movement/asset-movement-upsert.component';
import { AssetMovementModel } from '../model/asset-movement-model';
import { AssetMovementsServiceImpl } from '../service/impl/asset-movements-impl.service';
import { NotificationService } from '../../../commons/service/notification.service';

/**
 * Displays asset movement transactions (buy/sell operations)
 * Uses standardized app-table component with configurable columns and actions
 */
@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CommonModule, TableComponent, MatIconModule],
  providers: [CurrencyPipe, DatePipe],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent implements OnChanges {
  private service = inject(AssetMovementsServiceImpl);
  private modal = inject(NgbModal);
  private currencyPipe = inject(CurrencyPipe);
  private datePipe = inject(DatePipe);
  private notificationService = inject(NotificationService);

  @Input() parentId = 0;
  @Input() assetType?: string;

  movements: AssetMovementModel[] = [];
  columns: TableColumn[] = [];
  movementActions: TableAction<AssetMovementModel>[] = [];
  sort = '-date';
  loading = false;

  constructor() {
    this.initializeColumns();
    this.initializeActions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentId']) {
      this.loadMovements();
    }
  }

  /**
   * Initialize table columns based on context
   */
  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'Id' },
      ...(this.parentId === 0 ? [{ key: 'asset.ticker', label: 'Asset' }] : []),
      { key: 'operation', label: 'Operation' },
      { key: 'amount', label: 'Amount' },
      {
        key: 'unitValue',
        label: 'Unit Value',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      },
      {
        key: 'value',
        label: 'Value',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      },
      {
        key: 'date',
        label: 'Date',
        format: (value) => this.datePipe.transform(value as Date, 'dd/MM/yyyy') || ''
      }
    ];
  }

  /**
   * Initialize table actions (edit, delete)
   */
  private initializeActions(): void {
    this.movementActions = [
      {
        label: '+',
        icon: 'bi bi-pencil',
        action: (row) => this.updateMovements(row)
      },
      {
        label: 'Delete',
        icon: 'bi bi-trash',
        cssClass: 'danger',
        action: (row) => this.deleteMovement(row.id!)
      }
    ];
  }

  /**
   * Load movements with sorting and filtering
   */
  private loadMovements(): void {
    this.loading = true;
    const query = new PageQuery();
    query.sort = this.sort;

    if (this.assetType) {
      query.addQuery('assetType', this.assetType);
    }

    this.service.parentId = this.parentId;
    this.service.readAll(query).subscribe({
      next: (data: AssetMovementModel[]) => {
        this.movements = data;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error(`Erro ao recuperar Movimentos: ${error.error.message}`);
        this.loading = false;
      }
    });
  }

  /**
   * Open modal to add new movement
   */
  addMovements(): void {
    const modalRef = this.modal.open(AssetMovementUpsertComponent);
    modalRef.componentInstance.parentId = this.parentId;
  }

  /**
   * Open modal to edit existing movement
   */
  updateMovements(model: AssetMovementModel): void {
    const modalRef = this.modal.open(AssetMovementUpsertComponent);
    modalRef.componentInstance.parentId = this.parentId;
    modalRef.componentInstance.model = model;
  }

  /**
   * Delete movement by id
   */
  deleteMovement(id: number): void {
    if (confirm('Tem certeza que deseja deletar este movimento?')) {
      this.service.delete(id).subscribe({
        next: () => this.loadMovements(),
        error: (error) => this.notificationService.error(`Erro ao excluir movimento: ${error.error.message}`)
      });
    }
  }
}
