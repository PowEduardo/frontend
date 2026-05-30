import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../../commons/base/model/page-query';
import { PageQueryModel } from '../../../commons/base/model/page-query-model';
import { CardMovementsUpsertComponent } from '../../movements/card-movements-upsert/card-movements-upsert.component';
import { CardMovementService } from '../../movements/service/card-movement.service';
import { InstallmentModel } from './model/installment-model';
import { InstallmentService } from './service/installment.service';
import { CardMovementUpsertComponent } from './upsert/card-movement-upsert.component';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { TableColumn } from '../../../commons/model/table-column';
import { TableAction } from '../../../commons/model/table-action';
import { NotificationService } from '../../../commons/service/notification.service';
import { StatementService } from '../service/statement.service';
import { StatementModel } from '../model/statement-model';
import { StatementValidationModalComponent } from '../components/statement-validation-modal.component';

@Component({
  selector: 'app-installment',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './installment.component.html',
  styleUrl: './installment.component.css'
})
export class InstallmentComponent implements OnInit {
  private modalService = inject(NgbModal);
  private service = inject(InstallmentService);
  private movementService = inject(CardMovementService);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private statementService = inject(StatementService);

  installments: InstallmentModel[] = [];
  sort = 'id';
  loading = true;
  statementLoading = true;
  cardSelected!: number;
  statementId!: number;
  statement?: StatementModel;

  // Table configuration
  installmentColumns: TableColumn[] = [
    { label: 'Id', key: 'id' },
    { label: 'Descrição', key: 'description' },
    { label: 'Valor', key: 'value', format: (value: unknown) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    {
      label: 'Parcela', key: 'installment', format: (value: unknown, row) => {
        const inst = row as InstallmentModel;
        return `${value}/${inst.movement?.installment || value}`;
      }
    },
    { label: 'Data', key: 'date', format: (value: unknown) => new Date(value as string | Date).toLocaleDateString('pt-BR') }
  ];

  installmentActions: TableAction<InstallmentModel>[] = [
    {
      label: 'Editar Parcela',
      icon: 'bi bi-pencil',
      cssClass: 'primary',
      action: (installment: InstallmentModel) => this.edit(installment)
    },
    {
      label: 'Editar Movimento',
      icon: 'bi bi-arrow-left-right',
      cssClass: 'info',
      action: (installment: InstallmentModel) => this.editMovement(installment)
    }
  ];

  ngOnInit(): void {
    this.route.parent?.params.subscribe(parentParams => {
      this.cardSelected = 1;//Number(parentParams['cardId']);
      this.movementService.parentId = this.cardSelected;
      this.route.params.subscribe(params => {
        this.statementId = Number(params['statementId']);
        if (!isNaN(this.cardSelected) && !isNaN(this.statementId)) {
          this.loadStatement();
          this.getInstallments('id');
        }
      });
    });
  }

  /**
   * Load statement details
   */
  private loadStatement(): void {
    this.statementLoading = true;
    this.statementService.read(this.statementId).subscribe({
      next: (statement: StatementModel) => {
        this.statement = statement;
        this.statementLoading = false;
      },
      error: () => {
        this.notificationService.error('Erro ao carregar detalhes da fatura');
        this.statementLoading = false;
      }
    });
  }

  /**
   * Load installments with sorting
   */
  getInstallments(attribute: string): void {
    this.loading = true;
    if (this.sort === attribute) {
      attribute = '-' + attribute;
    }
    this.sort = attribute;
    this.installments = [];

    const query: PageQuery = new PageQueryModel();
    query.sort = attribute;

    this.service.readAll(query).subscribe({
      next: (data: InstallmentModel[]) => {
        this.installments = data;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error(`Erro ao carregar parcelas: ${error.error.message}`);
        this.loading = false;
      }
    });
  }

  /**
   * Validate statement - opens validation modal
   */
  validateStatement(): void {
    if (!this.statement) {
      this.notificationService.warning('Dados da fatura não disponíveis. Tente novamente em alguns instantes.');
      return;
    }

    const modalRef = this.modalService.open(StatementValidationModalComponent, { size: 'lg' });
    modalRef.componentInstance.statement = this.statement;
    modalRef.componentInstance.cardId = this.cardSelected;
  }

  /**
   * Edit installment
   */
  edit(installment: InstallmentModel): void {
    const modalRef = this.modalService.open(CardMovementUpsertComponent);
    modalRef.componentInstance.setModel(installment.id);
  }

  /**
   * Edit movement associated with installment
   */
  editMovement(installment: InstallmentModel): void {
    const modalRef = this.modalService.open(CardMovementsUpsertComponent);
    modalRef.componentInstance.setModel(installment.movement.id);
  }
}
