import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../commons/base/model/page-query';
import { ManageComponent } from '../../commons/modal/manage/manage.component';
import { CrudService } from '../../commons/service/crud.service';
import { VehiclePartModel } from './model/vehicle-part-model';
import { VehiclePartModule } from './vehicle-part.module';
import { VehiclePartUpsertComponent } from './vehicle-part-upsert/vehicle-part-upsert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-part',
  standalone: true,
  imports: [CommonModule, VehiclePartModule],
  templateUrl: './vehicle-part.component.html',
  styleUrl: './vehicle-part.component.css'
})
export class VehiclePartComponent implements OnInit {

  list: VehiclePartModel[] = [];
  selectedValues: number[] = [];
  parentId: number = 0;

  constructor(private service: CrudService<VehiclePartModel>,
    private modal: NgbModal
  ) {
  }

  ngOnInit(): void {
    const query: PageQuery = new PageQuery();
    this.service.readAll(query).subscribe((response: VehiclePartModel[]) => {
      this.list = response;
    }
    );
  }

  create() {
    this.modal.open(VehiclePartUpsertComponent).result.then((result) => {
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
    const upsert = this.modal.open(VehiclePartUpsertComponent);
    upsert.componentInstance.setModel(id);
    upsert.result.then((result: VehiclePartModel) => {
      this.list = this.list.map(vehicle =>
        vehicle.id === result.id ? result : vehicle
      );
    });
  }
}
