import { Routes } from '@angular/router';
import { InvestmentComponent } from './investment.component';
import { AssetTypeDetailsComponent } from './asset/details/asset-type-details.component';
import { MovementsComponent } from './asset/movements/movements.component';
import { ReturnsComponent } from './asset/returns/returns.component';

/**
 * Investment Module Routes
 *
 * Defines all routing paths for the Investment module:
 * - /investments - Main investment dashboard with consolidation
 * - /investments/details - Detailed view of specific asset type
 * - /investments/details/movements - Asset movements
 * - /investments/details/returns - Asset returns
 */
export const INVESTMENT_ROUTES: Routes = [
  {
    path: '',
    component: InvestmentComponent,
    children: [
      {
        path: 'details',
        component: AssetTypeDetailsComponent,
        children: [
          {
            path: 'movements',
            component: MovementsComponent
          },
          {
            path: 'returns',
            component: ReturnsComponent
          }
        ]
      }
    ]
  }
];
