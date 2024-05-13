import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RowModel } from '../../model/row-model';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css'
})

export class DynamicTableComponent {
  @Input()
  headers: string[];
  @Input()
  body: RowModel[];

  constructor() {
    this.headers = [];
    this.body = [];
  }
}
