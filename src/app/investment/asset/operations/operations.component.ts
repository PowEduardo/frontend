import { Component, Input } from '@angular/core';
import { MovementsComponent } from '../movements/movements.component';
import { AssetMovementMapperImpl } from '../mapper/impl/asset-movement-mapper-impl';
import { ReturnsComponent } from '../returns/returns.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [MovementsComponent, ReturnsComponent, CommonModule],
  providers: [AssetMovementMapperImpl],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.css'
})
export class OperationsComponent {
  @Input()
  assetId!: number;
  isMovimentsEnabled: boolean = false;
  isReturnsEnabled: boolean = false;

  openMoviments() {
    this.isReturnsEnabled = false;
    this.isMovimentsEnabled = true;
  }

  openReturns() {
    this.isMovimentsEnabled = false;
    this.isReturnsEnabled = true;
  }
}