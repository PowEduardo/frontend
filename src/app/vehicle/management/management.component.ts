import { Component, OnInit } from '@angular/core';
import { PageQuery } from '../../commons/base/model/page-query';
import { VehicleModel } from '../model/vehicle-model';
import { VehicleService } from '../service/vehicle.service';
import { VehicleTableComponent } from "../vehicle-table/vehicle-table.component";
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleUpsertComponent } from '../vehicle-upsert/vehicle-upsert.component';
import { ManageVehicleComponent } from './manage-vehicle/manage-vehicle.component';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [VehicleTableComponent, CommonModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit {

  list: VehicleModel[] = [];
  selectedVehicles: number[] = [];
  constructor(private service: VehicleService,
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
      this.list.push(result);
    });
  }

  updateVehicle(list: number[]) {
    this.selectedVehicles = list;

  }

  manageVehicle(): void {
    const userOption = this.modal.open(ManageVehicleComponent);
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
