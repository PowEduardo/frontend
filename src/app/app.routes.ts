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
import { VehicleFuelComponent } from './vehicle/vehicle-fuel/vehicle-fuel.component';
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
  { path: 'cards', component: CardComponent },
  { path: 'batch', component: BatchComponent },
  // Add route for 'vehicle' and 'vehicle/:id' to VehicleComponent
  { path: 'vehicles', component: VehicleComponent },
  { path: 'vehicles/:id', component: VehicleComponent, children: [
      { path: 'management', component: ManagementVehiclesComponent },
      { path: 'parts', component: VehiclePartComponent },
      { path: 'fuel', component: VehicleFuelComponent },
    ]
  }
];
