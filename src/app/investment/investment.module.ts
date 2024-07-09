import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CurrencyFormatPipe } from '../pipe/currency-format.pipe';
import { ConsolidateComponent } from './asset/consolidate/consolidate.component';
import { AssetTypeDetailsComponent } from './asset/details/asset-type-details.component';
import { PieComponent } from './chart/pie/pie.component';



@NgModule({
  declarations: [ 
    ConsolidateComponent
   ],
  imports: [
    CommonModule,
    PieComponent,
    CurrencyFormatPipe,
    RouterOutlet,
    RouterModule,
    AssetTypeDetailsComponent
  ],
  exports: [
    PieComponent,
    CommonModule,
    CurrencyFormatPipe,
    RouterOutlet,
    ConsolidateComponent,
    AssetTypeDetailsComponent
  ],
  providers:[DecimalPipe]
})
export class InvestmentModule { }
