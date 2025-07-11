import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpsertComponent } from '../../../commons/base/upsert/upsert.component';
import { CrudService } from '../../../commons/service/crud.service';
import { VehicleFuelModel } from '../model/vehicle-fuel';
import { VehicleFuelService } from '../../service/vehicle-fuel.service';

@Component({
  selector: 'app-vehicle-fuel-upsert',
  standalone: true,
  providers: [{ provide: CrudService, useClass: VehicleFuelService }],
  imports: [UpsertComponent, FormsModule, CommonModule],
  templateUrl: './vehicle-fuel-upsert.component.html',
  styleUrl: './vehicle-fuel-upsert.component.css'
})
export class VehicleFuelUpsertComponent extends UpsertComponent<VehicleFuelModel> {

  parentId: number | null = null;

  constructor(override activeModal: NgbActiveModal,
    override service: CrudService<VehicleFuelModel>,
    private route: ActivatedRoute
  ) {
    super(activeModal, service);
    this.model = new VehicleFuelModel();
    this.title = 'Vehicle Fuel';
    this.route.paramMap.subscribe(params => {
      this.parentId = Number(params.get('id'));
    });
  }

  override async onSubmit(): Promise<void> {
    super.onSubmit();
  }

  override async setModel(id: number): Promise<void> {
    this.service.baseUrl = this.service.baseUrl.replace('{parentId}', this.parentId!.toString());
    super.setModel(id);
  }

}
