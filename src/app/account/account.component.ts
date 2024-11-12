import { Component } from '@angular/core';
import { MovementsComponent } from "./movements/movements.component";
import { DetailsComponent } from './details/details.component';
import { AccountModule } from './account.module';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MovementsComponent, AccountModule, DetailsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
