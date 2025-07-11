
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
import { AssetMovementReturnType } from '../../../enum/asset-movement-return-type';
import { AssetMovementReturnModel } from '../../../model/asset-movement-return-model';
import { AssetReturnServiceImpl } from '../../../service/impl/movement-asset-return-impl.service';

@Component({
  selector: 'app-add-return',
  standalone: true,
  imports: [FormsModule, MovementUpsertModule, MovementModule],
  providers: [
    { provide: MovementService, useClass: AssetReturnServiceImpl },
    { provide: CrudService, useClass: AssetReturnServiceImpl },
    FormsModule
  ],
  templateUrl: './asset-return-upsert.component.html',
  styleUrl: './asset-return-upsert.component.css'
})
export class AssetReturnMovementUpsertComponent extends MovementUpsertComponent<AssetMovementReturnModel> {
  overrideValue: boolean = false;


  constructor(protected override service: MovementService<AssetMovementReturnModel>,
    protected override activeModal: NgbActiveModal) {
    super(activeModal, service);
    this.movementTypes = Object.values(AssetMovementReturnType);
    this.createMovement();
  }

  private createMovement(): void {
    this.model = new AssetMovementReturnModel();
    this.model.irFee = 0;
    this.model.type = MovementType.CREDIT;
    this.model.category = MovementCategory.INVESTMENT;
  }

  calculateValue() {
    if (!this.overrideValue) {
      const result = this.model!.amount * this.model!.unitValue - this.model!.irFee;
      this.model!.value = this.roundHalfUp(result, 2);
    }
  }
}
