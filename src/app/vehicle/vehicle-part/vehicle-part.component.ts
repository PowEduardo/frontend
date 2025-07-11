import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../commons/base/model/page-query';
import { ManageComponent } from '../../commons/modal/manage/manage.component';
import { CrudService } from '../../commons/service/crud.service';
import { VehiclePartModel } from './model/vehicle-part-model';
import { VehiclePartModule } from './vehicle-part.module';
import { VehiclePartUpsertComponent } from './vehicle-part-upsert/vehicle-part-upsert.component';

import { ChooseVehicleComponent } from "../modal/choose-vehicle/choose-vehicle.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../commons/base/model/page';

@Component({
  selector: 'app-vehicle-part',
  standalone: true,
  imports: [VehiclePartModule],
  templateUrl: './vehicle-part.component.html',
  styleUrl: './vehicle-part.component.css'
})
export class VehiclePartComponent implements OnInit {

  page!: Page<VehiclePartModel>
    selectedValues: number[] = [];
    parentId!: number;
    query!: PageQuery;

  constructor(
    private service: CrudService<VehiclePartModel>,
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.parentId = Number(params.get('id'));
      if (isNaN(this.parentId)) {
        return;
      }
      const query: PageQuery = new PageQuery();
      this.search(query);
    });
  }

  create() {
    this.modal.open(VehiclePartUpsertComponent).result.then((result) => {
      if (result === 'Close click') {
        return;
      }
    });
  }

  manage(): void {
    const userOption = this.modal.open(ManageComponent);
    userOption.result.then((result: string) => {
      if (result === 'delete') {
        this.selectedValues.forEach(id => {
          this.service.delete(id).subscribe(() => {
            this.page.content.splice(this.page.content.findIndex(vehicle => vehicle.id === id), 1);
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
      this.page.content = this.page.content.map(vehicle =>
        vehicle.id === result.id ? result : vehicle
      );
    });
  }

  nextPage() {
    if (this.query) {
      this.query.offset++;
      this.search(this.query);
    }
  }
  previousPage() {
    if (this.query && this.query.offset > 0) {
      this.query.offset--;
      this.search(this.query);
    }
  }

  private search(query: PageQuery) {
      this.service.search(query).subscribe((response: Page<VehiclePartModel>) => {
        this.page = response;
      });
    }
}
