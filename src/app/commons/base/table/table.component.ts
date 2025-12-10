import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
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

  /**
   * Optional template that the consumer can provide to render per-row custom
   * content (for example action buttons). In the consumer template use
   * `<ng-template let-row let-i="index">...</ng-template>` and the template
   * will receive the current row as `$implicit` and the index as `index`.
   */
  @ContentChild(TemplateRef) rowTemplate?: TemplateRef<any>;

  @Output() rowSelected = new EventEmitter<any>();

  onRowClick(row: any) {
    this.rowSelected.emit(row);
  }

  formatCell(col: TableColumn, row: { [key:string]:any  }): string {
    const value = row[col.key];
    return col.format ? col.format(value, row) : value;
  }
}