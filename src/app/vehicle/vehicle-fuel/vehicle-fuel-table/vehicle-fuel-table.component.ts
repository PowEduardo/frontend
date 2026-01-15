import { Component } from '@angular/core';
import { VehicleFuelModel } from '../model/vehicle-fuel';
import { Table } from '../../../commons/base/table/table';

@Component({
  selector: 'app-vehicle-fuel-table',
  standalone: true,
  templateUrl: './vehicle-fuel-table.component.html',
  styleUrl: './vehicle-fuel-table.component.css'
})
export class VehicleFuelTableComponent extends Table<VehicleFuelModel>{

}
