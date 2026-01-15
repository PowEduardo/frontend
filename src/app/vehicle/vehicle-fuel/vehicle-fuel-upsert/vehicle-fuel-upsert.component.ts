
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpsertComponent } from '../../../commons/base/upsert/upsert.component';
import { CrudService } from '../../../commons/service/crud.service';
import { VehicleFuelService } from '../../service/vehicle-fuel.service';
import { VehicleFuelModel } from '../model/vehicle-fuel';

@Component({
  selector: 'app-vehicle-fuel-upsert',
  standalone: true,
  providers: [{ provide: CrudService, useClass: VehicleFuelService }],
  imports: [UpsertComponent, FormsModule],
  templateUrl: './vehicle-fuel-upsert.component.html',
  styleUrl: './vehicle-fuel-upsert.component.css'
})
export class VehicleFuelUpsertComponent extends UpsertComponent<VehicleFuelModel> {
  private route = inject(ActivatedRoute);


  parentId: number | null = null;

  constructor() {
    super();
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
