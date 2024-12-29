import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementCategory } from '../../../commons/base/movement/enum/movement-category';
import { MovementService } from '../../../commons/base/movement/service/movement.service';
import { MovementUpsertComponent } from '../../../commons/base/movement/upsert/movement-upsert.component';
import { MovementUpsertModule } from '../../../commons/base/movement/upsert/movement-upsert.module';
import { AccountMovementModel } from '../../model/account-movement-model';
import { AccountMovementService } from '../service/account-movement-service';

@Component({
  selector: 'app-account-movements-upsert',
  standalone: true,
  imports: [CommonModule, FormsModule, MovementUpsertModule],
  providers: [
    {provide: MovementService, useClass: AccountMovementService}
  ],
  templateUrl: './account-movements-upsert.component.html',
  styleUrl: './account-movements-upsert.component.css'
})
export class AccountMovementsUpsertComponent extends MovementUpsertComponent<AccountMovementModel>{
  @Input()
  updateOperation: boolean = false;
  movementCategory!: string[];

  constructor(override activeModal: NgbActiveModal,
    override service: MovementService<AccountMovementModel>
  ) {
    super(service, activeModal);
    this.parentId = 1;
    this.movementCategory = Object.values(MovementCategory);
    if (this.model === undefined) {
      this.model = new AccountMovementModel();
      this.model.type = '';
      this.model.value = 0;
    }

  }
}
