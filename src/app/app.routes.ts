import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { InvestmentComponent } from './card/investment/investment.component';
import { AssetComponent } from './component/asset/asset/asset.component';
import { TableComponent } from './component/asset/table/table.component';
import { ReturnsComponent } from './component/asset/returns/returns.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [
      {
        path: 'investments', component: InvestmentComponent, children: [
          { path: 'assets', component: TableComponent },
          {
            path: 'assets/:id', component: AssetComponent, children: [
              { path: 'returns', component: ReturnsComponent }
            ]
          }

        ]
      }
    ]
  },

];