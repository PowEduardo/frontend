import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementComponent } from './movement.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MovementComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MovementComponent]
})
export class MovementModule { }
