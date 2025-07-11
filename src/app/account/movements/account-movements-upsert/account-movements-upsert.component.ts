
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementCategory } from '../../../commons/base/movement/enum/movement-category';
import { MovementService } from '../../../commons/base/movement/service/movement.service';
import { MovementUpsertComponent } from '../../../commons/base/movement/upsert/movement-upsert.component';
import { MovementUpsertModule } from '../../../commons/base/movement/upsert/movement-upsert.module';
import { AccountMovementModel } from '../../model/account-movement-model';
import { AccountMovementService } from '../service/account-movement-service';
import { CrudService } from '../../../commons/service/crud.service';

@Component({
  selector: 'app-account-movements-upsert',
  standalone: true,
  imports: [FormsModule, MovementUpsertModule],
  providers: [
    {provide: MovementService, useClass: AccountMovementService},
    {provide: CrudService, useClass: AccountMovementService}
  ],
  templateUrl: './account-movements-upsert.component.html',
  styleUrl: './account-movements-upsert.component.css'
})
export class AccountMovementsUpsertComponent extends MovementUpsertComponent<AccountMovementModel>{
  @Input()
  updateOperation: boolean = false;
  movementCategory!: string[];

  constructor(activeModal: NgbActiveModal,
    service: MovementService<AccountMovementModel>
  ) {
    super(activeModal, service);
    this.parentId = 1;
    this.movementCategory = Object.values(MovementCategory);
    this.cleanModel();
    this.title = 'Account';
  }

  override async onSubmit() {
    super.onSubmit();
    if (this.model.id === undefined) {
      this.cleanModel();
    }
  }

  cleanModel() {
    this.model = new AccountMovementModel();
    this.model.type = '';
    this.model.value = 0;
  }
}
