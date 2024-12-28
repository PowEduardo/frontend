import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementMapper } from '../../../../../commons/base/movement/mapper/movement-mapper';
import { MovementModule } from '../../../../../commons/base/movement/movement.module';
import { MovementService } from '../../../../../commons/base/movement/service/movement.service';
import { MovementUpsertComponent } from '../../../../../commons/base/movement/upsert/movement-upsert.component';
import { MovementUpsertModule } from '../../../../../commons/base/movement/upsert/movement-upsert.module';
import { AssetOperationType } from '../../../enum/asset-operation-type';
import { AssetMovementMapperImpl } from '../../../mapper/impl/asset-movement-mapper-impl';
import { AssetMovementModel } from '../../../model/asset-movement-model';
import { AssetMovementHttp } from '../../../model/http/asset-movement-http-model';
import { AssetMovementsServiceImpl } from '../../../service/impl/asset-movements-impl.service';

@Component({
  selector: 'app-asset-movement',
  standalone: true,
  imports: [FormsModule, CommonModule, MovementUpsertModule, MovementModule],
  providers: [
    {provide: MovementMapper, useClass: AssetMovementMapperImpl},
    {provide: MovementService, useClass: AssetMovementsServiceImpl},
    FormsModule
  ],
  templateUrl: './asset-movement-upsert.component.html',
  styleUrl: './asset-movement-upsert.component.css'
})
export class AssetMovementUpsertComponent extends MovementUpsertComponent<AssetMovementModel, AssetMovementHttp> implements OnInit{
  overrideValue: boolean = false;

  constructor (protected override service: MovementService<AssetMovementHttp>,
    protected override mapper: MovementMapper<AssetMovementModel, AssetMovementHttp>,
    protected override activeModal: NgbActiveModal) {
    super(service, mapper, activeModal);
  }

  ngOnInit(): void {
    if (!this.model) {
      this.model = new AssetMovementModel();
    }
    this.movementTypes = Object.values(AssetOperationType);
  }

  calculateValue() {
    if (!this.overrideValue) {
      const result = this.model!.amount * this.model!.unitValue + this.model.liquidationFee;
      this.model!.value = this.roundHalfUp(result, 3);
    }
  }

  roundHalfUp(value: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }

}
