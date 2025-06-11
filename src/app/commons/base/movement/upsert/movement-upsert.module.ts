import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovementUpsertComponent } from './movement-upsert.component';
import { MovementModule } from '../movement.module';
import { UpsertComponent } from "../../upsert/upsert.component";



@NgModule({
  declarations: [MovementUpsertComponent],
  imports: [
    CommonModule,
    FormsModule,
    MovementModule,
    UpsertComponent
],
  exports: [MovementUpsertComponent]
})
export class MovementUpsertModule { }
