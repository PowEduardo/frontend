import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MovementsComponent } from './investment/asset/movements/movements.component';
import { ReturnsComponent } from './investment/asset/returns/returns.component';
import { AssetTypeDetailsComponent } from './investment/asset/details/asset-type-details.component';
import { InvestmentComponent } from './investment/investment.component';
import { AccountComponent } from './account/account.component';
import { CardComponent } from './card/card.component';
import { BatchComponent } from './batch/batch.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ManagementComponent } from './vehicle/management/management.component';
export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'welcome', component: WelcomeComponent, children: [
      {
        path: 'investments', component: InvestmentComponent, children: [
          {
            path: 'details', component: AssetTypeDetailsComponent, children: [
              { path: 'returns', component: ReturnsComponent },
              { path: 'movements', component: MovementsComponent }
            ]
          }
        ]
      },
      { path: 'account', component: AccountComponent },
      { path: 'card', component: CardComponent },
      { path: 'batch', component: BatchComponent },
      {
        path: 'vehicles', component: VehicleComponent, children: [
          { path: 'management', component: ManagementComponent }
        ]
      }
    ]
  }

];