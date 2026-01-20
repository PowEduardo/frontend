import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../../commons/base/model/page-query';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { TableColumn } from '../../../commons/model/table-column';
import { TableAction } from '../../../commons/model/table-action';
import { AssetReturnMovementUpsertComponent } from '../modal/add-movement/asset-return/asset-return-upsert.component';
import { AssetMovementReturnModel } from '../model/asset-movement-return-model';
import { AssetReturnServiceImpl } from '../service/impl/movement-asset-return-impl.service';
import { NotificationService } from '../../../commons/service/notification.service';

/**
 * Displays asset return transactions (dividends, JCP, etc.)
 * Uses standardized app-table component with configurable columns and actions
 */
@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [CommonModule, TableComponent, MatIconModule],
  providers: [CurrencyPipe, DatePipe],
  templateUrl: './returns.component.html',
  styleUrl: './returns.component.css'
})
export class ReturnsComponent implements OnChanges {
  private service = inject(AssetReturnServiceImpl);
  private modal = inject(NgbModal);
  private currencyPipe = inject(CurrencyPipe);
  private datePipe = inject(DatePipe);
  private notificationService = inject(NotificationService);

  @Input() parentId = 0;
  @Input() assetType?: string;

  movements: AssetMovementReturnModel[] = [];
  columns: TableColumn[] = [];
  returnActions: TableAction<AssetMovementReturnModel>[] = [];
  sort = '-exDividendDate';
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
      ...(this.parentId === 0 ? [{ key: 'asset', label: 'Asset' }] : []),
      {
        key: 'unitValue',
        label: 'Unit Value',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      },
      { key: 'amount', label: 'Amount' },
      { key: 'operation', label: 'Operation' },
      {
        key: 'exDividendDate',
        label: 'Ex-Dividend Date',
        format: (value) => this.datePipe.transform(value as Date, 'dd/MM/yyyy') || ''
      },
      {
        key: 'date',
        label: 'Payment Date',
        format: (value) => this.datePipe.transform(value as Date, 'dd/MM/yyyy') || ''
      },
      {
        key: 'value',
        label: 'Value',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      }
    ];
  }

  /**
   * Initialize table actions (edit, delete)
   */
  private initializeActions(): void {
    this.returnActions = [
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
   * Load return movements with sorting and filtering
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
      next: (data: AssetMovementReturnModel[]) => {
        this.movements = data;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error(`Erro ao recuperar IRPF: ${error.error.message}`);
        this.loading = false;
      }
    });
  }

  /**
   * Open modal to add new return
   */
  addMovement(): void {
    const modalRef = this.modal.open(AssetReturnMovementUpsertComponent);
    modalRef.componentInstance.parentId = this.parentId;
  }

  /**
   * Open modal to edit existing return
   */
  updateMovements(model: AssetMovementReturnModel): void {
    const modalRef = this.modal.open(AssetReturnMovementUpsertComponent);
    modalRef.componentInstance.parentId = this.parentId;
    modalRef.componentInstance.model = model;
  }

  /**
   * Delete return by id
   */
  deleteMovement(id: number): void {
    if (confirm('Tem certeza que deseja deletar este retorno?')) {
      this.service.delete(id).subscribe({
        next: () => this.loadMovements(),
        error: (error) => this.notificationService.error(`Erro ao excluir movimento: ${error.error.message}`)
      });
    }
  }
}
