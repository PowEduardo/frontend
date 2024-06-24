import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModel } from '../../model/table-model';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css'
})

export class DynamicTableComponent {
  @Input()
  model!: TableModel;

  constructor() {
  }
}
