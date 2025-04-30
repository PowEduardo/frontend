import { Component, OnInit } from '@angular/core';
import { PageQuery } from '../../commons/base/model/page-query';
import { VehicleModel } from '../model/vehicle-model';
import { VehicleService } from '../service/vehicle.service';
import { VehicleTableComponent } from "../vehicle-table/vehicle-table.component";
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleUpsertComponent } from '../vehicle-upsert/vehicle-upsert.component';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [VehicleTableComponent, CommonModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit {

  list: VehicleModel[] = [];
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
}
