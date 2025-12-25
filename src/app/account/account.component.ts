import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AssetsComponent } from '../commons/modal/search/assets/assets.component';
import { AssetMovementUpsertComponent } from '../investment/asset/modal/add-movement/asset-movement/asset-movement-upsert.component';
import { AssetReturnMovementUpsertComponent } from '../investment/asset/modal/add-movement/asset-return/asset-return-upsert.component';
import { NotificationService } from '../commons/service/notification.service';
import { AccountModule } from './account.module';
import { DetailsComponent } from './details/details.component';
import { AccountMovementsUpsertComponent } from './movements/account-movements-upsert/account-movements-upsert.component';
import { MovementsComponent } from './movements/movements.component';
import { MovementTypeComponent } from '../commons/modal/movement/movement-type/movement-type.component';

/**
 * Main Account Component
 * Displays account details, movements, and provides UI for managing account movements.
 * Handles multi-modal workflow for adding movements (account or asset-related).
 */
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MovementsComponent, AccountModule, DetailsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  showMovements: boolean = true;

  constructor(
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) {}

  /**
   * Open modal to add a new movement
   * First asks user what type of movement (Account, Asset, or Return).
   * Then opens appropriate form based on selection.
   * Allows adding multiple movements without closing dialog.
   */
  async addMovement(): Promise<void> {
    try {
      // Step 1: Ask user what type of movement
      const movementType = await this.selectMovementType();
      if (!movementType) {
        return; // User cancelled
      }

      // Step 2: Get additional info based on type
      let parentId: number = 1; // Default for ACCOUNT type
      if (movementType !== 'ACCOUNT') {
        const assetId = await this.selectAssetId();
        if (!assetId) {
          return; // User cancelled
        }
        parentId = assetId;
      }

      // Step 3: Allow adding multiple movements
      let continueAdding = true;
      while (continueAdding) {
        const isAdded = await this.openMovementForm(movementType, parentId);
        if (!isAdded) {
          continueAdding = false;
        }
      }

      this.refreshMovements();
    } catch (error: any) {
      this.notificationService.error(`Failed to add movement: ${error.message}`);
    }
  }

  /**
   * Open modal for user to select movement type
   * @returns Movement type string or null if cancelled
   */
  private selectMovementType(): Promise<string | null> {
    return this.modalService.open(MovementTypeComponent).result
      .then(
        (result: string) => result,
        () => null // Dismiss
      );
  }

  /**
   * Open modal for user to select asset
   * @returns Asset ID or null if cancelled
   */
  private selectAssetId(): Promise<number | null> {
    return this.modalService.open(AssetsComponent).result
      .then(
        (assetId: number) => assetId,
        () => null // Dismiss
      );
  }

  /**
   * Open the appropriate movement form based on type
   * @param type Movement type (ACCOUNT, ASSET, or RETURN)
   * @param parentId Parent account/asset ID
   * @returns true if user wants to add another, false to stop
   */
  private openMovementForm(type: string, parentId: number): Promise<boolean> {
    const modalComponent = this.getModalComponentByType(type);
    const modal: NgbModalRef = this.modalService.open(modalComponent);
    modal.componentInstance.parentId = parentId;

    return modal.result
      .then(
        (result: string) => result === 'Continue', // 'Continue' means add another
        () => false // Dismiss
      );
  }

  /**
   * Get the appropriate modal component based on movement type
   * @param type Movement type string
   * @returns Component class for the movement form
   */
  private getModalComponentByType(
    type: string
  ): typeof AccountMovementsUpsertComponent | typeof AssetMovementUpsertComponent | typeof AssetReturnMovementUpsertComponent {
    switch (type) {
      case 'ACCOUNT':
        return AccountMovementsUpsertComponent;
      case 'ASSET':
        return AssetMovementUpsertComponent;
      case 'RETURN':
        return AssetReturnMovementUpsertComponent;
      default:
        throw new Error(`Unknown movement type: ${type}`);
    }
  }

  /**
   * Trigger refresh of movements display
   */
  private refreshMovements(): void {
    this.showMovements = false;
    setTimeout(() => {
      this.showMovements = true;
    }, 100);
  }
}
