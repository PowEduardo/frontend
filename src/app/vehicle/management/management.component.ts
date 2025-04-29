import { Component, OnInit } from '@angular/core';
import { PageQuery } from '../../commons/base/model/page-query';
import { VehicleModel } from '../model/vehicle-model';
import { VehicleService } from '../service/vehicle.service';
import { VehicleTableComponent } from "../vehicle-table/vehicle-table.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [VehicleTableComponent, CommonModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit {

  list: VehicleModel[] = [];
  constructor (private service: VehicleService) {
  }

  async ngOnInit(): Promise<void> {
    await this.service.readAll(new PageQuery()).subscribe((data) => {
      this.list = data;
    });
  }
}
