import { Routes } from '@angular/router';
import { AssetComponent } from './card/investment/asset/asset/asset.component';
import { ReturnsComponent } from './card/investment/asset/returns/returns.component';
import { TableComponent } from './card/investment/asset/table/table.component';
import { InvestmentComponent } from './card/investment/investment.component';
import { HomeComponent } from './page/home/home.component';
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