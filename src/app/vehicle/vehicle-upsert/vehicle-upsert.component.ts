import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpsertComponent } from '../../commons/base/upsert/upsert.component';
import { CrudService } from '../../commons/service/crud.service';
import { VehicleModel } from '../model/vehicle-model';
import { Crud } from '../../commons/base/movement/service/crud.service';
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'app-vehicle-upsert',
  standalone: true,
  imports: [FormsModule],
  providers: [{ provide: CrudService, useClass: VehicleService }],
  templateUrl: './vehicle-upsert.component.html',
  styleUrl: './vehicle-upsert.component.css'
})
export class VehicleUpsertComponent extends UpsertComponent<VehicleModel> {
  constructor(override activeModal: NgbActiveModal,
    override service: CrudService<VehicleModel>
  ) {
    super(activeModal, service);
    this.model = new VehicleModel();
    this.title = 'Vehicle';
  }

}
