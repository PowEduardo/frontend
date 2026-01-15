import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { PageQuery } from '../../../commons/base/model/page-query';
import { CrudService } from '../../../commons/service/crud.service';
import { VehicleModel } from '../../model/vehicle-model';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../commons/service/notification.service';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-choose-vehicle',
  standalone: true,
  imports: [FormsModule],
  providers: [{ provide: CrudService, useClass: VehicleService }],
  templateUrl: './choose-vehicle.component.html',
  styleUrl: './choose-vehicle.component.css'
})
export class ChooseVehicleComponent implements OnInit {
  private service = inject<CrudService<VehicleModel>>(CrudService);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);

  vehicles: VehicleModel[] = [];
  selectedVehicleId: number | null = null;
  @Output()
  selectedVehicleIdEmitter: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedVehicleId = Number(params.get('id'));
      this.service.readAll(new PageQuery()).subscribe(
        {
          next: (data: VehicleModel[]) => {
            this.vehicles = data;
          },
          error: (error) => {
            this.notificationService.error(`Erro ao recuperar veiculos: ${error.error.message}`);
          }
        });
    });
  }

  onVehicleSelected(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.selectedVehicleIdEmitter.emit(Number(selectedId));
  }
}
