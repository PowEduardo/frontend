import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardMovementModel } from '../model/card-movement-model';
import { CardMovementService } from '../service/card-movement.service';
import { NotificationService } from '../../../commons/service/notification.service';

/**
 * Card Movement Edit Component
 * Allows editing a single card movement: value, description, and status
 */
@Component({
  selector: 'app-card-movement-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="card-movement-edit-container">
      <div class="row mb-3">
        <div class="col">
          <h4>Editar Movimento</h4>
        </div>
        <div class="col text-end">
          <button class="btn btn-secondary" (click)="goBack()">
            <i class="bi bi-arrow-left me-2"></i> Voltar
          </button>
        </div>
      </div>

      @if (loading) {
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      } @else if (movementForm) {
        <form [formGroup]="movementForm" (ngSubmit)="saveMovement()" class="needs-validation">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="date" class="form-label">Data</label>
              <input 
                type="date" 
                class="form-control" 
                id="date"
                [value]="movement?.date | date: 'yyyy-MM-dd'"
                disabled
              />
              <small class="form-text text-muted">A data não pode ser alterada</small>
            </div>
            <div class="col-md-6">
              <label for="type" class="form-label">Tipo</label>
              <input 
                type="text" 
                class="form-control" 
                id="type"
                [value]="movement?.type || '-'"
                disabled
              />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="value" class="form-label">Valor</label>
              <div class="input-group">
                <span class="input-group-text">R$</span>
                <input 
                  type="number" 
                  class="form-control" 
                  id="value"
                  formControlName="value"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>
              @if (movementForm.get('value')?.invalid && movementForm.get('value')?.touched) {
                <div class="invalid-feedback d-block">
                  Valor inválido
                </div>
              }
            </div>
            <div class="col-md-6">
              <label for="status" class="form-label">Status</label>
              <select 
                class="form-select" 
                id="status"
                formControlName="paid"
              >
                <option [value]="false">Aberto</option>
                <option [value]="true">Pago</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Descrição</label>
            <textarea 
              class="form-control" 
              id="description"
              formControlName="description"
              rows="3"
              placeholder="Adicionar observações sobre este movimento"
            ></textarea>
          </div>

          @if (movement && movement.installment) {
            <div class="alert alert-info">
              <strong>Parcela:</strong> {{ movement.installment }}/{{ movement.installment }}
            </div>
          }

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" class="btn btn-outline-secondary" (click)="goBack()">
              <i class="bi bi-x me-2"></i> Cancelar
            </button>
            @if (!movement?.paid) {
              <button type="button" class="btn btn-warning" (click)="markAsPaid()">
                <i class="bi bi-check-circle me-2"></i> Marcar como Pago
              </button>
            }
            <button type="submit" class="btn btn-primary" [disabled]="!movementForm.valid">
              <i class="bi bi-check me-2"></i> Salvar
            </button>
          </div>
        </form>
      }
    </div>
  `,
  styles: [`
    .card-movement-edit-container {
      padding: 20px;
      max-width: 600px;
    }

    input[disabled],
    select[disabled] {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }

    .form-control, 
    .form-select {
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .invalid-feedback {
      color: #dc3545;
      margin-top: 0.25rem;
    }
  `]
})
export class CardMovementEditComponent implements OnInit {
  movementForm: FormGroup | null = null;
  loading: boolean = true;
  movement: CardMovementModel | null = null;
  cardId: number = 0;
  movementId: number = 0;

  constructor(
    private fb: FormBuilder,
    private movementService: CardMovementService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.cardId = params['cardId'];
      this.movementService.parentId = this.cardId;

      this.route.params.subscribe(params => {
        this.movementId = params['movementId'];
        this.loadMovement();
      });
    });
  }

  /**
   * Load movement details
   */
  private loadMovement(): void {
    this.loading = true;
    this.movementService.read(this.movementId).subscribe({
      next: (movement: CardMovementModel) => {
        this.movement = movement;
        this.initializeForm();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notificationService.error('Erro ao carregar movimento');
        this.goBack();
      }
    });
  }

  /**
   * Initialize form with movement data
   */
  private initializeForm(): void {
    this.movementForm = this.fb.group({
      value: [this.movement?.value || 0, [Validators.required, Validators.min(0.01)]],
      description: [this.movement?.description || ''],
      paid: [this.movement?.paid || false]
    });
  }

  /**
   * Save movement changes
   */
  saveMovement(): void {
    if (!this.movementForm?.valid || !this.movement) return;

    const updatedMovement: CardMovementModel = {
      ...this.movement,
      ...this.movementForm.getRawValue()
    };

    this.movementService.update(updatedMovement).subscribe({
      next: () => {
        this.notificationService.success('Movimento atualizado com sucesso');
        this.goBack();
      },
      error: () => {
        this.notificationService.error('Erro ao atualizar movimento');
      }
    });
  }

  /**
   * Mark movement as paid
   */
  markAsPaid(): void {
    if (!this.movement?.id) return;

    this.movementService.markAsPaid(this.movement.id).subscribe({
      next: () => {
        this.notificationService.success('Movimento marcado como pago');
        this.movement!.paid = true;
        this.movementForm?.patchValue({ paid: true });
      },
      error: () => {
        this.notificationService.error('Erro ao marcar como pago');
      }
    });
  }

  /**
   * Navigate back to movements list
   */
  goBack(): void {
    this.router.navigate([`/cards/${this.cardId}/movements`]);
  }
}
