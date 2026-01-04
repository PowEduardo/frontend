
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetServiceImpl } from '../../service/impl/asset-impl.service';
import { AssetModel } from '../../model/asset-model';
import { NotificationService } from '../../../../commons/service/notification.service';

/**
 * Add/Edit Asset Modal Component
 *
 * Allows users to create or update an investment asset.
 * Provides form validation and CRUD operations with user feedback.
 */
@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [FormsModule],
  providers: [AssetServiceImpl],
  templateUrl: './add-asset.component.html',
  styleUrl: './add-asset.component.css'
})
export class AddAssetComponent {
  /** Allow overriding calculated value */
  overrideValue: boolean = false;

  /** Whether this is an update operation (vs create) */
  @Input()
  updateOperation: boolean = false;

  /** Asset data model being edited */
  @Input()
  model!: AssetModel;

  /** Loading state indicator */
  loading: boolean = false;

  /**
   * Constructor
   * @param activeModal Modal reference for closing
   * @param service Asset service for CRUD operations
   * @param notificationService Notification service for user feedback
   */
  constructor(
    public activeModal: NgbActiveModal,
    private service: AssetServiceImpl,
    private notificationService: NotificationService
  ) {
    if (this.model === undefined) {
      this.model = new AssetModel();
      this.model.ticker = '';
      this.model.type = '';
      this.model.value = 0;
    }
  }

  /**
   * Handle form submission
   * Creates or updates the asset with error handling and user feedback
   */
  onSubmit(): void {
    if (!this.validateModel()) {
      this.notificationService.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    this.loading = true;
    const operation$ = this.updateOperation
      ? this.service.update(this.model!)
      : this.service.create(this.model!);

    operation$.subscribe({
      next: (result) => {
        const message = this.updateOperation
          ? `Ativo ${result.ticker} atualizado com sucesso`
          : `Ativo ${result.ticker} criado com sucesso`;
        this.notificationService.success(message);
        this.loading = false;
        this.activeModal.close(result);
      },
      error: (error) => {
        const message = this.updateOperation
          ? 'Erro ao atualizar ativo'
          : 'Erro ao criar ativo';
        this.notificationService.error(`${message}: ${error.message || error}`);
        this.loading = false;
      }
    });
  }

  /**
   * Validate model data before submission
   * @returns true if model is valid
   */
  private validateModel(): boolean {
    return !!(this.model?.ticker?.trim() && this.model?.type?.trim() && this.model?.value);
  }
}
