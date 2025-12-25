import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudService } from '../../../commons/service/crud.service';
import { VehicleModel } from '../../model/vehicle-model';
import { PageQuery } from '../../../commons/base/model/page-query';

import { VehicleService } from '../../service/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-choose-vehicle',
  standalone: true,
  imports: [FormsModule],
  providers: [{ provide: CrudService, useClass: VehicleService }],
  templateUrl: './choose-vehicle.component.html',
  styleUrl: './choose-vehicle.component.css'
})
export class ChooseVehicleComponent implements OnInit {
  vehicles: VehicleModel[] = [];
  selectedVehicleId: number | null = null;
  @Output()
  selectedVehicleIdEmitter: EventEmitter<number> = new EventEmitter<number>();
  constructor(
    private service: CrudService<VehicleModel>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedVehicleId = Number(params.get('id'));
      this.service.readAll(new PageQuery()).subscribe((data: VehicleModel[]) => {
        this.vehicles = data;
      });
    });
  }

  onVehicleSelected(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.selectedVehicleIdEmitter.emit(Number(selectedId));
  }
}
