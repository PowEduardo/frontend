import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyFormatPipe } from '../../../pipe/currency-format.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CurrencyFormatPipe
  ],
  exports: [
    CurrencyFormatPipe,
    CommonModule
  ]
})
export class InstallmentModule { }