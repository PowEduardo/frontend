import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../commons/base/model/page-query';
import { ManageComponent } from '../../commons/modal/manage/manage.component';
import { CrudService } from '../../commons/service/crud.service';
import { VehiclePartModel } from './model/vehicle-part-model';
import { VehiclePartUpsertComponent } from './vehicle-part-upsert/vehicle-part-upsert.component';

import { ActivatedRoute } from '@angular/router';
import { Page } from '../../commons/base/model/page';
import { NotificationService } from '../../commons/service/notification.service';
import { VehiclePartTableComponent } from "./vehicle-part-table/vehicle-part-table.component";

@Component({
  selector: 'app-vehicle-part',
  standalone: true,
  templateUrl: './vehicle-part.component.html',
  styleUrl: './vehicle-part.component.css',
  imports: [VehiclePartTableComponent]
})
export class VehiclePartComponent implements OnInit {
  private service = inject<CrudService<VehiclePartModel>>(CrudService);
  private modal = inject(NgbModal);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);


  page!: Page<VehiclePartModel>
  selectedValues: number[] = [];
  parentId!: number;
  query!: PageQuery;

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
          this.service.delete(id).subscribe(
            {
              next: () => {
                this.page.content.splice(this.page.content.findIndex(vehicle => vehicle.id === id), 1);
              },
              error: error => {
                this.notificationService.error(`Erro ao excluir cadastro: ${error.error.message}`);
              }
            }
          );
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
    this.service.search(query).subscribe(
      {
        next: (response: Page<VehiclePartModel>) => {
          this.page = response;
        },
        error: error => {
          this.notificationService.error(`Erro ao excluir pesquisar: ${error.error.message}`);
        }
      }
    );
  }
}
