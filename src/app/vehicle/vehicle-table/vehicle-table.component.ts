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
  selectedVehicle: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.list = changes['list'].currentValue;
    console.log(changes['list'].currentValue);
  }

  emitterId(id: number): void {
    this.selectedVehicle.emit(id);
  }
}
