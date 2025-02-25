import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MovementsComponent } from '../movements/movements.component';
import { ReturnsComponent } from '../returns/returns.component';
import { IrpfComponent } from "../irpf/irpf.component";

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [MovementsComponent, ReturnsComponent, CommonModule, IrpfComponent],
  providers: [],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.css'
})
export class OperationsComponent {
  @Input()
  assetId!: number;
  isMovementsEnabled: boolean = false;
  isReturnsEnabled: boolean = false;
  isIrpfEnabled: boolean = false;

  openMovements() {
    this.setAllFalse();
    this.isMovementsEnabled = true;
  }

  openReturns() {
    this.setAllFalse();
    this.isReturnsEnabled = true;
  }

  openIrpf() {
    this.setAllFalse();
    this.isIrpfEnabled = true;
  }

  setAllFalse() {
    this.isMovementsEnabled = false;
    this.isReturnsEnabled = false;
    this.isIrpfEnabled = false;
  }
}