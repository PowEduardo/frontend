
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovementCategory } from '../../../commons/base/movement/enum/movement-category';
import { MovementType } from '../../../commons/base/movement/enum/movement-type';
import { MovementService } from '../../../commons/base/movement/service/movement.service';
import { MovementUpsertComponent } from '../../../commons/base/movement/upsert/movement-upsert.component';
import { MovementUpsertModule } from '../../../commons/base/movement/upsert/movement-upsert.module';
import { CrudService } from '../../../commons/service/crud.service';
import { CardMovementModel } from '../model/card-movement-model';
import { CardMovementService } from '../service/card-movement.service';

@Component({
  selector: 'app-card-movements-upsert',
  standalone: true,
  imports: [FormsModule, MovementUpsertModule],
  providers: [
    { provide: MovementService, useClass: CardMovementService },
    { provide: CrudService, useClass: CardMovementService }
  ],
  templateUrl: './card-movements-upsert.component.html',
  styleUrl: './card-movements-upsert.component.css'
})
export class CardMovementsUpsertComponent extends MovementUpsertComponent<CardMovementModel> {
  @Input()
  updateOperation = false;
  movementCategory!: string[];

  constructor() {

    super();
    this.parentId = 1;
    this.movementCategory = Object.values(MovementCategory);
    if (this.model === undefined) {
      this.initializeModel();
    }
  }

  override async onSubmit(): Promise<void> {
    super.onSubmit();
    if (this.model.id === undefined) {
      this.model.value = 0.0;
      this.model.installment = 1;
      this.model.description = '';
      this.model.category = '';
    }
  }

  initializeModel() {
    this.model = new CardMovementModel();
    this.model.type = '';
    this.model.value = 0;
    this.model.type = MovementType.CREDIT;
    this.model.paid = false;
    this.model.date = new Date();
    this.model.installment = 1;
  }
}
