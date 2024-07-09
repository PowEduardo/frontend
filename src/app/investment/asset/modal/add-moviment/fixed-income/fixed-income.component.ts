import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementMapper } from '../../../../../commons/base/movement/mapper/movement-mapper';
import { MovementService } from '../../../../../commons/base/movement/service/movement.service';
import { MovementUpsertComponent } from '../../../../../commons/base/movement/upsert/movement-upsert.component';
import { FixedIncomeOperationType } from '../../../enum/fixed-income-operation-type';
import { AssetMovimentReturnMapperImpl } from '../../../mapper/impl/asset-moviment-return-mapper-impl';
import { FixedIncomeMovementModel } from '../../../model/fixed-income-moviment-model';
import { FixedIncomeMovementHttp } from '../../../model/http/fixed-income-movement-http';
import { AssetMovementsServiceImpl } from '../../../service/impl/asset-movements-impl.service';

@Component({
  selector: 'app-fixed-income',
  templateUrl: './fixed-income.component.html',
  styleUrl: './fixed-income.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [
    {provide: MovementService, useClass: AssetMovementsServiceImpl},
    {provide: MovementMapper, useClass: AssetMovimentReturnMapperImpl}
  ]
})
export class FixedIncomeComponent extends MovementUpsertComponent<FixedIncomeMovementModel, FixedIncomeMovementHttp> implements OnInit{

  constructor (protected override service: MovementService<FixedIncomeMovementHttp>,
    protected override mapper: MovementMapper<FixedIncomeMovementModel, FixedIncomeMovementHttp>,
    protected override activeModal: NgbActiveModal) {
    super(service, mapper, activeModal);
  }

  ngOnInit(): void {
    this.model = new FixedIncomeMovementModel();
    this.movimentTypes = Object.values(FixedIncomeOperationType);
  }
}
