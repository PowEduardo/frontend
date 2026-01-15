import { Component, OnChanges } from '@angular/core';
import { Table } from '../../commons/base/table/table';
import { VehicleModel } from '../model/vehicle-model';

@Component({
  selector: 'app-vehicle-table',
  standalone: true,
  templateUrl: './vehicle-table.component.html',
  styleUrl: './vehicle-table.component.css'
})
export class VehicleTableComponent extends Table<VehicleModel> implements OnChanges {

}
