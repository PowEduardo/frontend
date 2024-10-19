import { Component } from '@angular/core';
import { MovementsComponent } from "./movements/movements.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MovementsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
