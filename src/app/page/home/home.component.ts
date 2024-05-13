import { Component } from '@angular/core';
import { AccountComponent } from '../../card/account/account.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AccountComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
