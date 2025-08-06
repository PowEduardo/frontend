import { Routes } from '@angular/router';
import { CardComponent } from './card.component';

export const CARD_ROUTES: Routes = [
  {
    path: '',
    component: CardComponent
  },
  {
    path: ':id',
    component: CardComponent
  }
];