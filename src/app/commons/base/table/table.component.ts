import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../../model/table-column';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  imports: [CommonModule]
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];

  @Output() rowSelected = new EventEmitter<any>();

  onRowClick(row: any) {
    this.rowSelected.emit(row);
  }

  formatCell(col: TableColumn, row: { [key:string]:any  }): string {
    const value = row[col.key];
    return col.format ? col.format(value, row) : value;
  }
}