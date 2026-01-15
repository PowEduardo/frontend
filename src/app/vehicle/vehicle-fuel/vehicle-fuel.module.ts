import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CrudService } from '../../commons/service/crud.service';
import { VehicleFuelService } from '../service/vehicle-fuel.service';
import { VehicleFuelTableComponent } from './vehicle-fuel-table/vehicle-fuel-table.component';



@NgModule({
  declarations: [VehicleFuelTableComponent],
  imports: [
    CommonModule
  ],
  exports: [
    VehicleFuelTableComponent
  ],
  providers: [{provide: CrudService, useClass: VehicleFuelService}],
})
export class VehicleFuelModule { }
