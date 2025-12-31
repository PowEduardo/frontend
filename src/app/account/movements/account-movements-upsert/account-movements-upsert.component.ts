
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementCategory } from '../../../commons/base/movement/enum/movement-category';
import { MovementService } from '../../../commons/base/movement/service/movement.service';
import { MovementUpsertComponent } from '../../../commons/base/movement/upsert/movement-upsert.component';
import { MovementUpsertModule } from '../../../commons/base/movement/upsert/movement-upsert.module';
import { NotificationService } from '../../../commons/service/notification.service';
import { CrudService } from '../../../commons/service/crud.service';
import { AccountMovementModel } from '../../model/account-movement-model';
import { AccountMovementService } from '../service/account-movement-service';

/**
 * Account Movement Upsert Component
 * Modal form for creating and updating account movements.
 * Supports both create (with auto-submit) and edit operations.
 */
@Component({
  selector: 'app-account-movements-upsert',
  standalone: true,
  imports: [FormsModule, MovementUpsertModule],
  providers: [
    { provide: MovementService, useClass: AccountMovementService },
    { provide: CrudService, useClass: AccountMovementService }
  ],
  templateUrl: './account-movements-upsert.component.html',
  styleUrl: './account-movements-upsert.component.css'
})
export class AccountMovementsUpsertComponent extends MovementUpsertComponent<AccountMovementModel> {
  
  @Input()
  updateOperation: boolean = false;

  movementCategory: string[] = [];

  constructor(
    activeModal: NgbActiveModal,
    service: MovementService<AccountMovementModel>,
    private notificationService: NotificationService
  ) {
    super(activeModal, service);
    this.parentId = 1;
    this.movementCategory = Object.values(MovementCategory);
    this.cleanModel();
    this.title = 'Account';
  }

  /**
   * Submit form and save movement
   * Clears the form after successful creation for adding multiple movements.
   * Shows notification on success or error.
   */
  override async onSubmit(): Promise<void> {
    try {
      await super.onSubmit();
      this.notificationService.success('Movement saved successfully');
      
      // Clear form only if creating new (no ID)
      if (this.model.id === undefined) {
        this.cleanModel();
      }
    } catch (error: any) {
      this.notificationService.error(`Failed to save movement: ${error.message}`);
    }
  }

  /**
   * Reset form to initial state with empty values
   */
  private cleanModel(): void {    this.model = new AccountMovementModel();
    this.model.type = '';
    this.model.value = 0;
  }
}