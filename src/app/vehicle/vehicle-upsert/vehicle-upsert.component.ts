import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpsertComponent } from '../../commons/base/upsert/upsert.component';
import { VehicleModel } from '../model/vehicle-model';
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'app-vehicle-upsert',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vehicle-upsert.component.html',
  styleUrl: './vehicle-upsert.component.css'
})
export class VehicleUpsertComponent extends UpsertComponent<VehicleModel> {
  constructor(override activeModal: NgbActiveModal,
    override service: VehicleService
  ) {
    super(activeModal, service);
    this.model = new VehicleModel();
    this.title = 'Vehicle';
  }

}
