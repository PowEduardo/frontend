import { Routes } from '@angular/router';
import { CardComponent } from './card.component';
import { InstallmentComponent } from './movements/installment/installment.component';
import { StatementComponent } from './statement/statement.component';

export const CARD_ROUTES: Routes = [
  {
    path: '',
    component: CardComponent
  },
  {
    path: ':id',
    component: CardComponent,
    children: [
      {
        path: 'statements',
        component: StatementComponent,
        children: [
          {
            path: 'installments',
            component: InstallmentComponent
          }
        ]
      }
    ]
  }
];