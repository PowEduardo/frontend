
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementCategory } from '../../../../../commons/base/movement/enum/movement-category';
import { MovementType } from '../../../../../commons/base/movement/enum/movement-type';
import { MovementModule } from '../../../../../commons/base/movement/movement.module';
import { MovementService } from '../../../../../commons/base/movement/service/movement.service';
import { MovementUpsertComponent } from '../../../../../commons/base/movement/upsert/movement-upsert.component';
import { MovementUpsertModule } from '../../../../../commons/base/movement/upsert/movement-upsert.module';
import { CrudService } from '../../../../../commons/service/crud.service';
import { AssetOperationType } from '../../../enum/asset-operation-type';
import { AssetMovementModel } from '../../../model/asset-movement-model';
import { AssetMovementsServiceImpl } from '../../../service/impl/asset-movements-impl.service';

@Component({
  selector: 'app-asset-movement',
  standalone: true,
  imports: [FormsModule, MovementUpsertModule, MovementModule],
  providers: [
    { provide: MovementService, useClass: AssetMovementsServiceImpl },
    { provide: CrudService, useClass: AssetMovementsServiceImpl },
    FormsModule
  ],
  templateUrl: './asset-movement-upsert.component.html',
  styleUrl: './asset-movement-upsert.component.css'
})
export class AssetMovementUpsertComponent extends MovementUpsertComponent<AssetMovementModel> {
  overrideValue: boolean = false;

  constructor(service: MovementService<AssetMovementModel>,
    activeModal: NgbActiveModal) {
    super(activeModal, service);
    this.movementTypes = Object.values(AssetOperationType);
    this.createMovement();
  }

  createMovement(): void {
    if (!this.model) {
      this.model = new AssetMovementModel();
      this.model.type = MovementType.DEBIT;
      this.model.category = MovementCategory.INVESTMENT;
    }
  }

  calculateValue() {
    if (!this.overrideValue) {
      const result = this.model!.amount * this.model!.unitValue + (this.model!.operation.toString() === AssetOperationType.SELL.toString() ? -this.model.liquidationFee : this.model.liquidationFee);
      this.model!.value = this.roundHalfUp(result, 3);
    }
  }
}
