import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpsertComponent } from '../../commons/base/upsert/upsert.component';
import { CrudService } from '../../commons/service/crud.service';
import { VehicleModel } from '../model/vehicle-model';
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'app-vehicle-upsert',
  standalone: true,
  imports: [FormsModule, UpsertComponent],
  providers: [{ provide: CrudService, useClass: VehicleService }],
  templateUrl: './vehicle-upsert.component.html',
  styleUrl: './vehicle-upsert.component.css'
})
export class VehicleUpsertComponent extends UpsertComponent<VehicleModel> {
  constructor() {
    super();
    this.model = new VehicleModel();
    this.title = 'Vehicle';
  }

}
