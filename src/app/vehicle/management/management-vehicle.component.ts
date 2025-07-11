
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../commons/base/model/page-query';
import { CrudService } from '../../commons/service/crud.service';
import { VehicleModel } from '../model/vehicle-model';
import { VehicleUpsertComponent } from '../vehicle-upsert/vehicle-upsert.component';
import { VehicleModule } from '../vehicle.module';
import { ManageComponent } from '../../commons/modal/manage/manage.component';
import { Management } from '../../commons/page/management';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [VehicleModule],
  templateUrl: './management-vehicle.component.html',
  styleUrl: './management-vehicle.component.css'
})
export class ManagementVehiclesComponent implements OnInit, Management {

  list: VehicleModel[] = [];
  selectedVehicles: number[] = [];
  constructor(private service: CrudService<VehicleModel>,
    private modal: NgbModal
  ) {
  }

  async ngOnInit(): Promise<void> {
    const pageQuery = new PageQuery();
    pageQuery.sort = 'id';
    await this.service.readAll(pageQuery).subscribe((data) => {
      this.list = data;
    });
  }

  addVehicle() {
    this.modal.open(VehicleUpsertComponent).result.then((result) => {
      if (result === 'Close click') {
        return;
      }
      this.list.push(result);
    });
  }

  updateVehicle(list: number[]) {
    this.selectedVehicles = list;

  }

  manageVehicle(): void {
    const userOption = this.modal.open(ManageComponent);
    userOption.result.then((result: string) => {
      if (result === 'delete') {
        this.selectedVehicles.forEach(id => {
          this.service.delete(id).subscribe(() => {
            this.list.splice(this.list.findIndex(vehicle => vehicle.id === id), 1);
          });
        });
      } else if (result === 'update') {
        this.selectedVehicles.forEach(id => {
          this.openUpsertModal(id);
        });
      }
    });
  }

  private openUpsertModal(id: number): void {
    const upsertVehicle = this.modal.open(VehicleUpsertComponent);
    upsertVehicle.componentInstance.setModel(id);
    upsertVehicle.result.then((result: VehicleModel) => {
      this.list = this.list.map(vehicle =>
        vehicle.id === result.id ? result : vehicle
      );
    });
  }
}
