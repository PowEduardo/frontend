import { Component } from '@angular/core';
import { MovementsComponent } from "./movements/movements.component";
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MovementsComponent, DetailsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
