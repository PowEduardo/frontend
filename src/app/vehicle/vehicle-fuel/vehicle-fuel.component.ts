
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../commons/base/model/page';
import { PageQuery } from '../../commons/base/model/page-query';
import { ManageComponent } from '../../commons/modal/manage/manage.component';
import { CrudService } from '../../commons/service/crud.service';
import { VehicleModule } from '../vehicle.module';
import { VehicleFuelModel } from './model/vehicle-fuel';
import { VehicleFuelUpsertComponent } from './vehicle-fuel-upsert/vehicle-fuel-upsert.component';
import { VehicleFuelModule } from "./vehicle-fuel.module";

@Component({
  selector: 'app-vehicle-fuel',
  standalone: true,
  imports: [VehicleModule, VehicleFuelModule],
  templateUrl: './vehicle-fuel.component.html',
  styleUrl: './vehicle-fuel.component.css'
})
export class VehicleFuelComponent implements OnInit {

  page!: Page<VehicleFuelModel>
  selectedValues: number[] = [];
  parentId!: number;
  query!: PageQuery;

  constructor(private service: CrudService<VehicleFuelModel>,
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.parentId = Number(params.get('id'));
      if (isNaN(this.parentId)) {
        return;
      }
      this.query = new PageQuery();
      this.query.sort = '-date,-id';
      this.search(this.query);
    });
  }

  create() {
    this.modal.open(VehicleFuelUpsertComponent).result.then((result) => {
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
            if (this.page && this.page.content) {
              this.page.content.splice(this.page.content.findIndex(vehicle => vehicle.id === id), 1);
            }
          });
        });
      } else if (result === 'update') {
        this.selectedValues.forEach(id => {
          this.openUpsertModal(id);
        });
      }
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
  private openUpsertModal(id: number): void {
    const upsert = this.modal.open(VehicleFuelUpsertComponent);
    upsert.componentInstance.setModel(id);
    upsert.result.then((result: VehicleFuelModel) => {
      if (this.page && this.page.content) {
        this.page.content = this.page.content.map(vehicle =>
          vehicle.id === result.id ? result : vehicle
        );
      }
    });
  }

  private search(query: PageQuery) {
    this.service.search(query).subscribe((response: Page<VehicleFuelModel>) => {
      this.page = response;
    });
  }

}
