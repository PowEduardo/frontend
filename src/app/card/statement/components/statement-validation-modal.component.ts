import { Component, Input, OnInit, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatementValidationService } from '../service/statement-validation.service';
import { NotificationService } from '../../../commons/service/notification.service';
import { StatementModel } from '../model/statement-model';
import { ExternalTransactionDTO } from '../model/external-transaction.model';
import { StatementValidationResultDTO, InstallmentValidationDTO } from '../model/statement-validation-result.model';

@Component({
  selector: 'app-statement-validation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statement-validation-modal.component.html',
  styleUrls: ['./statement-validation-modal.component.css']
})
export class StatementValidationModalComponent implements OnInit {
  @Input() statement!: StatementModel;
  @Input() cardId!: number;
  @Output() onInstallmentEdited = new EventEmitter<void>();

  private validationService = inject(StatementValidationService);
  private notificationService = inject(NotificationService);
  private activeModal = inject(NgbActiveModal);

  // Component state
  activeTab: 'upload' | 'reconciliation' = 'upload';
  csvTransactions: ExternalTransactionDTO[] = [];
  validationResult!: StatementValidationResultDTO;
  isLoading = false;
  showReconciliation = false;
  selectedFile: File | null = null;
  runningTotal = 0;

  // Edit mode state
  editingInstallmentId: number | null = null;
  editingValue: number | null = null;

  ngOnInit(): void {
    // Initialize component
  }

  /**
   * Handle file upload
   */
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  /**
   * Upload and parse CSV
   */
  uploadCsv(): void {
    if (!this.selectedFile) {
      this.notificationService.error('Please select a CSV file');
      return;
    }

    this.isLoading = true;
    this.validationService.uploadCsv(this.cardId, this.statement.id!, this.selectedFile)
      .subscribe({
        next: (transactions) => {
          this.csvTransactions = transactions.map(t => ({ ...t, included: true }));
          this.calculateRunningTotal();
          this.isLoading = false;
        },
        error: (error) => {
          this.notificationService.error('Error parsing CSV: ' + error.message);
          this.isLoading = false;
        }
      });
  }

  /**
   * Toggle transaction inclusion
   */
  toggleTransaction(index: number): void {
    if (this.csvTransactions[index]) {
      this.csvTransactions[index].included = !this.csvTransactions[index].included;
      this.calculateRunningTotal();
    }
  }

  /**
   * Calculate running total of selected transactions
   */
  calculateRunningTotal(): void {
    this.runningTotal = this.csvTransactions
      .filter(t => t.included)
      .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);
  }

  /**
   * Proceed to reconciliation after validation
   */
  proceedToReconciliation(): void {
    const selectedTransactions = this.csvTransactions.filter(t => t.included);
    if (selectedTransactions.length === 0) {
      this.notificationService.error('Please select at least one transaction');
      return;
    }

    this.isLoading = true;
    this.validationService.validate(
      this.cardId,
      this.statement.id!,
      { externalTransactions: selectedTransactions, externalTotal: this.runningTotal }
    ).subscribe({
      next: (result) => {
        this.validationResult = result;
        this.activeTab = 'reconciliation';
        this.showReconciliation = true;
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.error('Error validating statement: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  /**
   * Start editing an installment value
   */
  startEdit(installment: InstallmentValidationDTO): void {
    this.editingInstallmentId = installment.installmentId;
    this.editingValue = parseFloat(installment.installmentValue.toString());
  }

  /**
   * Save edited installment and re-validate
   */
  saveEdit(): void {
    if (this.editingInstallmentId === null || this.editingValue === null) {
      return;
    }

    this.isLoading = true;
    this.validationService.updateInstallment(
      this.cardId,
      this.statement.id!,
      this.editingInstallmentId,
      this.editingValue
    ).subscribe({
      next: () => {
        this.notificationService.success('Installment updated successfully');
        this.editingInstallmentId = null;
        this.editingValue = null;
        this.onInstallmentEdited.emit();

        // Re-validate
        this.reValidate();
      },
      error: (error) => {
        this.notificationService.error('Error updating installment: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  /**
   * Cancel editing
   */
  cancelEdit(): void {
    this.editingInstallmentId = null;
    this.editingValue = null;
  }

  /**
   * Re-validate current selected transactions
   */
  reValidate(): void {
    const selectedTransactions = this.csvTransactions.filter(t => t.included);
    if (selectedTransactions.length === 0) {
      this.notificationService.error('No transactions selected');
      return;
    }

    this.isLoading = true;
    this.validationService.validate(
      this.cardId,
      this.statement.id!,
      { externalTransactions: selectedTransactions, externalTotal: this.runningTotal }
    ).subscribe({
      next: (result) => {
        this.validationResult = result;
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.error('Error re-validating: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  /**
   * Close modal
   */
  closeModal(): void {
    this.activeModal.dismiss();
  }

  /**
   * Format currency for display
   */
  formatCurrency(value: number | undefined): string {
    if (value === undefined) return 'R$ 0,00';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
