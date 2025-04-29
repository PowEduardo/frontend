import { Component, Input } from '@angular/core';
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
export class VehicleTableComponent {

  @Input()
  list: any[] = [];
}
