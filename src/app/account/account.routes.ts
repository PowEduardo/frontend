import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { DetailsComponent } from './details/details.component';
import { MovementsComponent } from './movements/movements.component';

/**
 * Account Module Routes
 * Defines the routing structure for the account feature module with nested child routes
 * for account details and movements.
 * 
 * Routes:
 * - /accounts - List all accounts
 * - /accounts/:accountId - Account details (parent route)
 *   - /accounts/:accountId/movements - List movements for account
 */
export const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    component: AccountComponent
  },
  {
    path: ':accountId',
    component: DetailsComponent,
    children: [
      {
        path: 'movements',
        component: MovementsComponent
      }
    ]
  }
];
