import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { BatchComponent } from './batch/batch.component';
import { CardComponent } from './card/card.component';
import { AssetTypeDetailsComponent } from './investment/asset/details/asset-type-details.component';
import { MovementsComponent } from './investment/asset/movements/movements.component';
import { ReturnsComponent } from './investment/asset/returns/returns.component';
import { InvestmentComponent } from './investment/investment.component';
import { ManagementVehiclesComponent } from './vehicle/management/management-vehicle.component';
import { VehiclePartComponent } from './vehicle/vehicle-part/vehicle-part.component';
import { VehicleComponent } from './vehicle/vehicle.component';
export const routes: Routes = [
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
  { path: 'accounts/:id', component: AccountComponent },
  { path: 'card', component: CardComponent },
  { path: 'batch', component: BatchComponent },
  {
    path: 'vehicles', component: VehicleComponent, children: [
      { path: 'management', component: ManagementVehiclesComponent },
      { path: ':id/parts', component: VehiclePartComponent },
      { path: 'parts', component: VehiclePartComponent }
    ]
  }

];