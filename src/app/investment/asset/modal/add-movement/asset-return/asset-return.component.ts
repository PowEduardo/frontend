import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementMapper } from '../../../../../commons/base/movement/mapper/movement-mapper';
import { MovementModule } from '../../../../../commons/base/movement/movement.module';
import { MovementService } from '../../../../../commons/base/movement/service/movement.service';
import { MovementUpsertComponent } from '../../../../../commons/base/movement/upsert/movement-upsert.component';
import { MovementUpsertModule } from '../../../../../commons/base/movement/upsert/movement-upsert.module';
import { AssetMovementReturnType } from '../../../enum/asset-movement-return-type';
import { AssetMovementReturnMapperImpl } from '../../../mapper/impl/asset-movement-return-mapper-impl';
import { AssetMovementReturnModel } from '../../../model/asset-movement-return-model';
import { AssetMovementReturnHttp } from '../../../model/http/asset-movement-return-http-model';
import { AssetReturnServiceImpl } from '../../../service/impl/movement-asset-return-impl.service';

@Component({
  selector: 'app-add-return',
  standalone: true,
  imports: [FormsModule, CommonModule, MovementUpsertModule, MovementModule],
  providers: [
    { provide: MovementMapper, useClass: AssetMovementReturnMapperImpl },
    { provide: MovementService, useClass: AssetReturnServiceImpl },
    FormsModule
  ],
  templateUrl: './asset-return.component.html',
  styleUrl: './asset-return.component.css'
})
export class AssetReturnMovementUpsertComponent extends MovementUpsertComponent<AssetMovementReturnModel, AssetMovementReturnHttp> {
  overrideValue: boolean = false;

  constructor(protected override service: MovementService<AssetMovementReturnHttp>,
    protected override mapper: MovementMapper<AssetMovementReturnModel, AssetMovementReturnHttp>,
    protected override activeModal: NgbActiveModal) {
    super(service, mapper, activeModal);
  }

  ngOnInit(): void {
    this.model = new AssetMovementReturnModel();
    this.model.irFee = 0;
    this.movementTypes = Object.values(AssetMovementReturnType);
  }

  calculateValue() {
    if (!this.overrideValue) {
      const result = this.model!.amount * this.model!.unitValue - this.model!.irFee;
      this.model!.value = this.roundHalfUp(result, 3);
    }
  }

  roundHalfUp(value: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }
}
