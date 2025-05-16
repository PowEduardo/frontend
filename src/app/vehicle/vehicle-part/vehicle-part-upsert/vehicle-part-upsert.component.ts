import { Component } from '@angular/core';
import { UpsertComponent } from '../../../commons/base/upsert/upsert.component';
import { VehiclePartModel } from '../model/vehicle-part-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from '../../../commons/service/crud.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiclePartService } from '../../service/vehicle-part.service';
import { VehicleService } from '../../service/vehicle.service';
import { VehicleModel } from '../../model/vehicle-model';
import { PageQuery } from '../../../commons/base/model/page-query';

@Component({
  selector: 'app-vehicle-part-upsert',
  standalone: true,
  imports: [UpsertComponent, FormsModule, CommonModule],
  providers: [{ provide: CrudService, useClass: VehiclePartService }, VehicleService],
  templateUrl: './vehicle-part-upsert.component.html',
  styleUrl: './vehicle-part-upsert.component.css'
})
export class VehiclePartUpsertComponent extends UpsertComponent<VehiclePartModel> {

  vehicles: VehicleModel[] = [];
  
  constructor(override activeModal: NgbActiveModal,
    override service: CrudService<VehiclePartModel>,
    private vehicleService: VehicleService
  ) {
    super(activeModal, service);
    this.model = new VehiclePartModel();
    this.title = 'Vehicle';
    this.vehicleService.readAll(new PageQuery()).subscribe((data: VehicleModel[]) => {
      this.vehicles = data;
    }
    );
  }

  override async onSubmit(): Promise<void> {
    console.log(this.model);
    this.service.baseUrl = this.service.baseUrl.replace('{parentId}', this.model.vehicle.id.toString());
    super.onSubmit();
  }

  override async setModel(id: number): Promise<void> {
    this.service.baseUrl = this.service.baseUrl.replace('{parentId}', '0');
    super.setModel(id);
  }

}
