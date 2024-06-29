import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { InvestmentComponent } from './card/investment/investment.component';
import { AssetComponent } from './component/asset/asset/asset.component';
import { AssetTableComponent } from './component/asset-table/asset-table.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [
      {
        path: 'investments', component: InvestmentComponent, children: [
          { path: 'assets', component: AssetTableComponent },
          { path: 'assets/:id', component: AssetComponent }

        ]
      }
    ]
  },

];