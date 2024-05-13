import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountComponent } from './card/account/account.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './pages/home/home.component.html',
  styleUrl: './pages/home/home.component.css',
  imports: [RouterOutlet, CommonModule, AccountComponent]
})
export class AppComponent {
  title = 'frontend';
}
