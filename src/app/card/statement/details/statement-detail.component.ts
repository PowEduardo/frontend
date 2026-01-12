import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StatementModel } from '../model/statement-model';
import { InstallmentModel } from '../model/installment-model';
import { StatementService } from '../service/statement.service';
import { NotificationService } from '../../../commons/service/notification.service';
import { TableComponent } from '../../../commons/base/table/table.component';
import { TableColumn } from '../../../commons/model/table-column';
import { TableAction } from '../../../commons/model/table-action';

/**
 * Statement Detail Component
 * Displays detailed information about a specific card statement/invoice
 * Shows installments with edit capability and summary
 */
@Component({
  selector: 'app-statement-detail',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './statement-detail.component.html',
  styleUrls: ['./statement-detail.component.css']
})
export class StatementDetailComponent implements OnInit {
  statement: StatementModel | null = null;
  loading: boolean = true;
  cardId: number = 0;
  statementId: number = 0;
  totalPaid: number = 0;

  // Table configuration
  installmentColumns: TableColumn[] = [
    { label: 'Parcela', key: 'installmentNumber', format: (value: unknown, row: any) => `${value}/${(row as InstallmentModel).totalInstallments}` },
    { label: 'Descrição', key: 'description', format: (value: unknown) => (value as string | null | undefined) || '-' },
    { label: 'Valor', key: 'value', format: (value: unknown) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { label: 'Data', key: 'dueDate', format: (value: unknown) => new Date(value as string | Date).toLocaleDateString('pt-BR') },
    { label: 'Status', key: 'paid', format: (value: unknown) => value ? '✓ Paga' : '○ Aberta' }
  ];

  installmentActions: TableAction<InstallmentModel>[] = [
    {
      label: 'Editar',
      icon: 'bi bi-pencil',
      cssClass: 'primary',
      action: (installment: InstallmentModel) => this.editInstallment(installment)
    }
  ];

  constructor(
    private statementService: StatementService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.cardId = params['cardId'];

      this.route.params.subscribe(params => {
        this.statementId = params['statementId'];
        this.loadStatement();
      });
    });
  }

  /**
   * Load statement details
   */
  private loadStatement(): void {
    this.loading = true;
    this.statementService.read(this.statementId).subscribe({
      next: (statement: StatementModel) => {
        this.statement = statement;
        this.calculateTotalPaid();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notificationService.error('Erro ao carregar fatura');
        this.goBack();
      }
    });
  }

  /**
   * Calculate total paid from installments
   */
  private calculateTotalPaid(): void {
    if (this.statement?.installments && Array.isArray(this.statement.installments)) {
      this.totalPaid = this.statement.installments
        .filter((i: InstallmentModel) => i.paid)
        .reduce((sum: number, i: InstallmentModel) => sum + i.value, 0);
    }
  }

  /**
   * Edit installment
   */
  editInstallment(installment: InstallmentModel): void {
    this.router.navigate([
      `/cards/${this.cardId}/statements/${this.statementId}/installments/${installment.id}/edit`
    ]);
  }

  /**
   * Mark statement as paid
   */
  markAsPaid(): void {
    if (!this.statement) return;

    const updatedStatement: StatementModel = {
      ...this.statement,
      closed: true
    };

    this.statementService.update(updatedStatement).subscribe({
      next: () => {
        this.notificationService.success('Fatura marcada como paga');
        this.statement!.closed = true;
      },
      error: () => {
        this.notificationService.error('Erro ao marcar fatura como paga');
      }
    });
  }

  /**
   * Navigate back to statements list
   */
  goBack(): void {
    this.router.navigate([`/cards/${this.cardId}/statements`]);
  }
}
