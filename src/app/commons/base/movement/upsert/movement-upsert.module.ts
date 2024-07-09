import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovementUpsertComponent } from './movement-upsert.component';
import { MovementModule } from '../movement.module';



@NgModule({
  declarations: [MovementUpsertComponent],
  imports: [
    CommonModule,
    FormsModule,
    MovementModule
  ],
  exports: [MovementUpsertComponent]
})
export class MovementUpsertModule { }
