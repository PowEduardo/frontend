import { Component } from '@angular/core';
import { VehiclePartModel } from '../model/vehicle-part-model';
import { Table } from '../../../commons/base/table/table';

@Component({
  selector: 'app-vehicle-part-table',
  standalone: true,
  templateUrl: './vehicle-part-table.component.html',
  styleUrl: './vehicle-part-table.component.css'
})
export class VehiclePartTableComponent extends Table<VehiclePartModel>{

}
