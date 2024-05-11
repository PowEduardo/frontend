import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RowModel } from '../../model/row-model';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css'
})

export class DynamicTableComponent {
  headers: string[] = ["teste", "2"];
  body: RowModel[] = [{ id: 1, columnValues: ["id", "name"] }, { id: 2, columnValues: ["id", "names"] }];
}
