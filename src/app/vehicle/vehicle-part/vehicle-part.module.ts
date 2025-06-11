import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CrudService } from '../../commons/service/crud.service';
import { VehiclePartService } from '../service/vehicle-part.service';
import { VehiclePartTableComponent } from './vehicle-part-table/vehicle-part-table.component';



@NgModule({
  declarations: [VehiclePartTableComponent],
  imports: [
    CommonModule
  ],
  exports: [
    VehiclePartTableComponent
  ],
  providers: [{provide: CrudService, useClass: VehiclePartService}],
})
export class VehiclePartModule { }
