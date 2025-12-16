import { Routes } from '@angular/router';
import { CardComponent } from './card.component';
import { CardDetailComponent } from './shared/detail/card-detail.component';
import { InstallmentComponent } from './statement/installment/installment.component';
import { StatementComponent } from './statement/statement.component';
import { StatementDetailComponent } from './statement/details/statement-detail.component';
import { CardMovementListComponent } from './movements/list/card-movement-list.component';
import { CardMovementEditComponent } from './movements/edit/card-movement-edit.component';

export const CARD_ROUTES: Routes = [
  {
    path: '',
    component: CardComponent
  },
  {
    path: ':cardId',
    component: CardDetailComponent,
    children: [
      {
        path: 'statements',
        component: StatementComponent,
        children: [
          {
            path: ':statementId/details',
            component: StatementDetailComponent
          },
          {
            path: ':statementId/installments',
            component: InstallmentComponent
          }
        ]
      },
      {
        path: 'movements',
        component: CardMovementListComponent,
        children: [
          {
            path: ':movementId/edit',
            component: CardMovementEditComponent
          }
        ]
      }
    ]
  }
];