import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MovementsComponent } from '../movements/movements.component';
import { ReturnsComponent } from '../returns/returns.component';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [MovementsComponent, ReturnsComponent, CommonModule],
  providers: [],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.css'
})
export class OperationsComponent {
  @Input()
  assetId!: number;
  isMovementsEnabled: boolean = false;
  isReturnsEnabled: boolean = false;

  openMovements() {
    this.isReturnsEnabled = false;
    this.isMovementsEnabled = true;
  }

  openReturns() {
    this.isMovementsEnabled = false;
    this.isReturnsEnabled = true;
  }
}