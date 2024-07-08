import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { InvestmentComponent } from '../../card/investment/investment.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, InvestmentComponent, RouterOutlet],
  providers: [DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isAccountEnabled: boolean = false;
  isInvestmentEnabled: boolean = false;
  isCreditCard: boolean = false;
  isVehicles: boolean = false;

  constructor(private router: Router) { }
  disableAll(): void {
    this.isAccountEnabled = false;
  }

  enableAccount(): void {
    this.disableAll();
    this.isAccountEnabled = true;
  }

  enableInvestment(): void {
    this.disableAll();
    this.router.navigate(['investments']);
  }

  enableCreditCard(): void {
    this.disableAll();
    this.isCreditCard = true;
  }

  enableVehicles(): void {
    this.disableAll();
    this.isVehicles = true;
  }

  goBack(): void {
    this.router.navigate(['home']);
  }
}
