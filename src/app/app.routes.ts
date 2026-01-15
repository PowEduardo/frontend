import { Routes } from '@angular/router';
import { BatchComponent } from './batch/batch.component';
import { ManagementVehiclesComponent } from './vehicle/management/management-vehicle.component';
import { VehiclePartComponent } from './vehicle/vehicle-part/vehicle-part.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleFuelComponent } from './vehicle/vehicle-fuel/vehicle-fuel.component';

export const routes: Routes = [
  {
    path: 'investments',
    loadChildren: () => import('./investment/investment.routes').then(m => m.INVESTMENT_ROUTES)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./account/account.routes').then(m => m.ACCOUNT_ROUTES)
  },
  {
    path: 'cards',
    loadChildren: () => import('./card/card.routes').then(m => m.CARD_ROUTES)
  },
  {
    path: 'batch',
    component: BatchComponent
  },
  // Add route for 'vehicle' and 'vehicle/:id' to VehicleComponent
  {
    path: 'vehicles',
    component: VehicleComponent
  },
  {
    path: 'vehicles/:id',
    component: VehicleComponent,
    children: [
      {
        path: 'management',
        component: ManagementVehiclesComponent
      },
      {
        path: 'parts',
        component: VehiclePartComponent
      },
      {
        path: 'fuel',
        component: VehicleFuelComponent
      }
    ]
  }
];
