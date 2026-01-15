import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpsertComponent } from '../../../commons/base/upsert/upsert.component';
import { CrudService } from '../../../commons/service/crud.service';
import { VehiclePartModel } from '../model/vehicle-part-model';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageQuery } from '../../../commons/base/model/page-query';
import { VehicleModel } from '../../model/vehicle-model';
import { VehiclePartService } from '../../service/vehicle-part.service';
import { VehicleService } from '../../service/vehicle.service';
import { NotificationService } from '../../../commons/service/notification.service';

@Component({
  selector: 'app-vehicle-part-upsert',
  standalone: true,
  imports: [UpsertComponent, FormsModule],
  providers: [{ provide: CrudService, useClass: VehiclePartService }, VehicleService],
  templateUrl: './vehicle-part-upsert.component.html',
  styleUrl: './vehicle-part-upsert.component.css'
})
export class VehiclePartUpsertComponent extends UpsertComponent<VehiclePartModel> {

  vehicles: VehicleModel[] = [];
  parentId: number | null = null;

  constructor(override activeModal: NgbActiveModal,
    override service: CrudService<VehiclePartModel>,
    override notificationService: NotificationService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute
  ) {
    super(activeModal, service, notificationService);
    this.model = new VehiclePartModel();
    this.title = 'Vehicle';
    this.vehicleService.readAll(new PageQuery()).subscribe(
      {
        next: (data: VehicleModel[]) => {
          this.vehicles = data;
        },
        error: error => {
          this.notificationService.error(`Erro ao listar cadastros: ${error.error.message}`);
        }
      }
    );
    this.route.paramMap.subscribe(params => {
      this.parentId = Number(params.get('id'));
    });
  }

  override async onSubmit(): Promise<void> {

    this.service.baseUrl = this.service.baseUrl.replace('{parentId}', this.parentId!.toString());
    super.onSubmit();
  }

  override async setModel(id: number): Promise<void> {
    this.service.baseUrl = this.service.baseUrl.replace('{parentId}', this.parentId!.toString());
    super.setModel(id);
  }

}
