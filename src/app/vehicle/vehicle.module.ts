import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../commons/service/crud.service';
import { VehicleService } from './service/vehicle.service';
import { VehicleTableComponent } from './vehicle-table/vehicle-table.component';



@NgModule({
  declarations: [VehicleTableComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [VehicleTableComponent],
  providers: [{ provide: CrudService, useClass: VehicleService }, DecimalPipe],
})
export class VehicleModule { }
