import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementCategory } from '../../../commons/base/movement/enum/movement-category';
import { MovementService } from '../../../commons/base/movement/service/movement.service';
import { MovementUpsertComponent } from '../../../commons/base/movement/upsert/movement-upsert.component';
import { MovementUpsertModule } from '../../../commons/base/movement/upsert/movement-upsert.module';
import { CardMovementModel } from '../model/card-movement-model';
import { CardMovementService } from '../service/card-movement.service';
import { MovementType } from '../../../commons/base/movement/enum/movement-type';

@Component({
  selector: 'app-card-movements-upsert',
  standalone: true,
  imports: [CommonModule, FormsModule, MovementUpsertModule],
    providers: [
      {provide: MovementService, useClass: CardMovementService}
    ],
  templateUrl: './card-movements-upsert.component.html',
  styleUrl: './card-movements-upsert.component.css'
})
export class CardMovementsUpsertComponent extends MovementUpsertComponent<CardMovementModel>{
  @Input()
  updateOperation: boolean = false;
  movementCategory!: string[];

  constructor(override activeModal: NgbActiveModal,
    override service: MovementService<CardMovementModel>
  ) {
    super(service, activeModal);
    this.parentId = 1;
    this.movementCategory = Object.values(MovementCategory);
    if (this.model === undefined) {
      this.model = new CardMovementModel();
      this.model.type = '';
      this.model.value = 0;
      this.model.type = MovementType.CREDIT;
      this.model.paid = false;
    }
  }
}
