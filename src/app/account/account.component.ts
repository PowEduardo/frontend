import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetsComponent } from '../commons/modal/search/assets/assets.component';
import { AssetMovementUpsertComponent } from '../investment/asset/modal/add-movement/asset-movement/asset-movement-upsert.component';
import { AssetReturnMovementUpsertComponent } from '../investment/asset/modal/add-movement/asset-return/asset-return.component';
import { AssetDetailsModel } from '../investment/asset/model/asset-model-details';
import { AccountModule } from './account.module';
import { DetailsComponent } from './details/details.component';
import { AccountMovementsUpsertComponent } from './movements/account-movements-upsert/account-movements-upsert.component';
import { MovementsComponent } from "./movements/movements.component";
import { MovementTypeComponent } from '../commons/modal/movement/movement-type/movement-type.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MovementsComponent, AccountModule, DetailsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  showMovements: boolean = true;
  constructor(private modalService: NgbModal) {
  }
  async addMovement() {
    var type = null;
    var parentId = null;
    await this.modalService.open(MovementTypeComponent).result.then(
      (result: string) => {
        type = result;
      }
    );
    const movementModal = this.getType(type!);

    if (movementModal === AccountMovementsUpsertComponent) {
      parentId = 1;
    } else {
      await this.modalService.open(AssetsComponent).result.then(
        (asset: number) => {
          parentId = asset;
        }
      );
    }
    const modal = this.modalService.open(movementModal);
    modal.componentInstance.parentId = parentId;
    await modal.result.then(
      () => {
        this.showMovements = false;
        this.showMovements = true;
      }
    );

  }

  getType(type: string): any {
    switch (type) {
      case "ACCOUNT":
        return AccountMovementsUpsertComponent;
      case "ASSET":
        return AssetMovementUpsertComponent;
      case "RETURN":
        return AssetReturnMovementUpsertComponent;
    }
  }

}
