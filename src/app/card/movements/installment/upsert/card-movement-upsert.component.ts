import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstallmentModel } from '../model/installment-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InstallmentService } from '../service/installment.service';
import { UpsertComponent } from '../../../../commons/base/upsert/upsert.component';

@Component({
  selector: 'app-upsert',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-movement-upsert.component.html',
  styleUrl: './card-movement-upsert.component.css'
})
export class CardMovementUpsertComponent extends UpsertComponent<InstallmentModel> {

  constructor(activeModal: NgbActiveModal,
    service: InstallmentService
  ) {
    super(activeModal, service);
  }

}
