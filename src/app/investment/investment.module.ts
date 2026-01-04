import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ConsolidateComponent } from './asset/consolidate/consolidate.component';
import { AssetTypeDetailsComponent } from './asset/details/asset-type-details.component';
import { PieComponent } from './chart/pie/pie.component';

/**
 * Investment Module
 *
 * DEPRECATED: This module is maintained for backward compatibility only.
 *
 * All components are now standalone. For new components or features,
 * import and use standalone components directly instead of this module.
 *
 * This module will be removed in a future version.
 *
 * @deprecated Use standalone components and INVESTMENT_ROUTES instead
 */
@NgModule({
  imports: [
    CommonModule,
    PieComponent,
    RouterOutlet,
    RouterModule,
    AssetTypeDetailsComponent,
    ConsolidateComponent
  ],
  exports: [
    PieComponent,
    CommonModule,
    RouterOutlet,
    ConsolidateComponent,
    AssetTypeDetailsComponent
  ],
  providers: [DecimalPipe, CurrencyPipe]
})
export class InvestmentModule { }
