import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AssetTableComponent } from '../../component/asset-table/asset-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AssetTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isAccountEnabled: boolean = false;
  isInvestmentEnabled: boolean = false;
  isCreditCard: boolean = false;
  isVehicles: boolean = false;

  disableAll(): void {
    this.isAccountEnabled = false;
  }

  enableAccount(): void {
    this.disableAll();
    this.isAccountEnabled = true;
  }

  enableInvestment(): void {
    this.disableAll();
    this.isInvestmentEnabled = true;
  }

  enableCreditCard(): void {
    this.disableAll();
    this.isCreditCard = true;
  }

  enableVehicles(): void {
    this.disableAll();
    this.isVehicles = true;
  }
}
