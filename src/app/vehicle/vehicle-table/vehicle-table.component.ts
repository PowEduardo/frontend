import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyFormatPipe } from "../../pipe/currency-format.pipe";
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-table',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule],
  providers: [DecimalPipe],
  templateUrl: './vehicle-table.component.html',
  styleUrl: './vehicle-table.component.css'
})
export class VehicleTableComponent implements OnChanges {

  @Input()
  list: any[] = [];
  @Output()
  selectedVehiclesEmitter: EventEmitter<number[]> = new EventEmitter<number[]>();
  selectedVehicles: number[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    this.list = changes['list'].currentValue;
    this.selectedVehicles = [];
  }

  selectAll(): void {
    if (this.selectedVehicles.length === this.list.length) {
      this.selectedVehicles = [];
    } else {
      this.list.forEach((vehicle) => {
        if (this.selectedVehicles.includes(vehicle.id)) {
          return;
        } else {
          this.selectedVehicles.push(vehicle.id);
        }
      });
    }
    this.emitterSelectedVehicles();
  }

  selectOne(id: number): void {
    if (this.selectedVehicles.includes(id)) {
      this.selectedVehicles.splice(this.selectedVehicles.indexOf(id), 1);
    } else {
      this.selectedVehicles.push(id);
    }
    this.emitterSelectedVehicles();
  }

  emitterSelectedVehicles(): void {
    this.selectedVehiclesEmitter.emit(this.selectedVehicles);
  }
}
