import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovementsComponent } from './investment/asset/movements/movements.component';
import { ReturnsComponent } from './investment/asset/returns/returns.component';
import { AssetTypeDetailsComponent } from './investment/asset/details/asset-type-details.component';
import { InvestmentComponent } from './investment/investment.component';
import { AccountComponent } from './account/account.component';
import { CardComponent } from './card/card.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
    { path: 'investments', component: InvestmentComponent, children: [
      { path: 'details', component: AssetTypeDetailsComponent, children: [
        { path: 'returns', component: ReturnsComponent },
        { path: 'movements', component: MovementsComponent }
        ]
      }
    ]
  },
    { path: 'account', component: AccountComponent},
    { path: 'card', component: CardComponent}
]
},
  
];