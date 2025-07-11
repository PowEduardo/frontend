import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../commons/base/model/page-query';
import { ManageComponent } from '../../commons/modal/manage/manage.component';
import { CrudService } from '../../commons/service/crud.service';
import { ChooseVehicleComponent } from "../modal/choose-vehicle/choose-vehicle.component";
import { VehiclePartUpsertComponent } from '../vehicle-part/vehicle-part-upsert/vehicle-part-upsert.component';
import { VehicleModule } from '../vehicle.module';
import { VehicleFuelModel } from './model/vehicle-fuel';
import { VehicleFuelModule } from "./vehicle-fuel.module";
import { CommonModule } from '@angular/common';
import { VehicleFuelUpsertComponent } from './vehicle-fuel-upsert/vehicle-fuel-upsert.component';

@Component({
  selector: 'app-vehicle-fuel',
  standalone: true,
  imports: [ChooseVehicleComponent, VehicleModule, VehicleFuelModule, CommonModule],
  templateUrl: './vehicle-fuel.component.html',
  styleUrl: './vehicle-fuel.component.css'
})
export class VehicleFuelComponent implements OnInit {

  list: VehicleFuelModel[] = [];
  selectedValues: number[] = [];
  parentId: number | null = null;

  constructor(private service: CrudService<VehicleFuelModel>,
      private modal: NgbModal,
      private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.parentId = Number(params.get('id'));
      // Update the baseUrl with the correct parentId
      if (isNaN(this.parentId)) {
        return;
      }
      this.service.baseUrl = `http://localhost:8080/vehicles/${this.parentId}/fuel`;
      const query: PageQuery = new PageQuery();
      query.sort = '-date,-id';
      this.service.readAll(query).subscribe((response: VehicleFuelModel[]) => {
        this.list = response;
      });
    });
  }

  onVehicleSelected(id: number) {
    this.router.navigate([`/vehicles/${id}/fuel/`]);
  }

  create() {
      this.modal.open(VehicleFuelUpsertComponent).result.then((result) => {
        if (result === 'Close click') {
          return;
        }
        this.list.push(result);
      });
    }
  
    manage(): void {
      const userOption = this.modal.open(ManageComponent);
      userOption.result.then((result: string) => {
        if (result === 'delete') {
          this.selectedValues.forEach(id => {
            this.service.delete(id).subscribe(() => {
              this.list.splice(this.list.findIndex(vehicle => vehicle.id === id), 1);
            });
          });
        } else if (result === 'update') {
          this.selectedValues.forEach(id => {
            this.openUpsertModal(id);
          });
        }
      });
    }
  
    private openUpsertModal(id: number): void {
      const upsert = this.modal.open(VehicleFuelUpsertComponent);
      upsert.componentInstance.setModel(id);
      upsert.result.then((result: VehicleFuelModel) => {
        this.list = this.list.map(vehicle =>
          vehicle.id === result.id ? result : vehicle
        );
      });
    }

}
