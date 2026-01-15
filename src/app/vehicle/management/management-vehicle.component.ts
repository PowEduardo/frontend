
import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../commons/base/model/page-query';
import { CrudService } from '../../commons/service/crud.service';
import { VehicleModel } from '../model/vehicle-model';
import { VehicleUpsertComponent } from '../vehicle-upsert/vehicle-upsert.component';
import { VehicleModule } from '../vehicle.module';
import { ManageComponent } from '../../commons/modal/manage/manage.component';
import { Management } from '../../commons/page/management';
import { NotificationService } from '../../commons/service/notification.service';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [VehicleModule],
  templateUrl: './management-vehicle.component.html',
  styleUrl: './management-vehicle.component.css'
})
export class ManagementVehiclesComponent implements OnInit, Management {
  private service = inject<CrudService<VehicleModel>>(CrudService);
  private modal = inject(NgbModal);
  private notificationService = inject(NotificationService);


  list: VehicleModel[] = [];
  selectedVehicles: number[] = [];

  async ngOnInit(): Promise<void> {
    const pageQuery = new PageQuery();
    pageQuery.sort = 'id';
    await this.service.readAll(pageQuery).subscribe(
      {
        next: (data) => {
          this.list = data;
        },
        error: (error) => {
          this.notificationService.error(`Erro ao recuperar veículos: ${error.error.message}`);
        }
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
          this.service.delete(id).subscribe({
            next: () => {
              this.list.splice(this.list.findIndex(vehicle => vehicle.id === id), 1);
            },
            error: (error) => {
              this.notificationService.error(`Erro ao excluir um veículo: ${error.error.message}`);
            }
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
