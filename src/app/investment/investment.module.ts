import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
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
    RouterOutlet,
    RouterModule,
    AssetTypeDetailsComponent
  ],
  exports: [
    PieComponent,
    CommonModule,
    RouterOutlet,
    ConsolidateComponent,
    AssetTypeDetailsComponent
  ],
  providers:[DecimalPipe, CurrencyPipe]
})
export class InvestmentModule { }
