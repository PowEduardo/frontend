import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { TableColumn } from '../../../commons/model/table-column';
import { TableAction } from '../../../commons/model/table-action';
import { CommonModule } from '@angular/common';

/**
 * Generic Table Component
 * Displays data in a responsive Bootstrap table with optional actions.
 * 
 * Usage:
 * ```html
 * <app-table 
 *   [columns]="columns"
 *   [data]="items"
 *   [actions]="actions"
 *   (rowSelected)="onRowSelect($event)">
 * </app-table>
 * ```
 */
@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  imports: [CommonModule]
})
export class TableComponent<T = unknown> {
  @Input() columns: TableColumn[] = [];
  @Input() data: T[] = [];

  /**
   * Optional action buttons to display in each row.
   * If provided, a new "Actions" column will be added.
   */
  @Input() actions?: TableAction<T>[];

  /**
   * Optional template that the consumer can provide to render per-row custom
   * content (for example action buttons). In the consumer template use
   * `<ng-template let-row let-i="index">...</ng-template>` and the template
   * will receive the current row as `$implicit` and the index as `index`.
   */
  @ContentChild(TemplateRef) rowTemplate?: TemplateRef<{ $implicit: T; index: number }>;

  @Output() rowSelected = new EventEmitter<T>();

  onRowClick(row: T): void {
    this.rowSelected.emit(row);
  }

  formatCell(col: TableColumn, row: T): string {
    const value = this.getNestedValue(row, col.key);
    return col.format ? col.format(value, row as unknown) : String(value);
  }
  private getNestedValue(obj: T, key: string): unknown {
    let value: unknown = obj as Record<string, unknown>;
    if (key.includes('.')) {
      const keys = key.split('.');
      for (const k of keys) {
        value = (value as Record<string, unknown>)[k];
      }
      return value;
    }
    return (value as Record<string, unknown>)[key];
  }
  /**
   * Execute an action on a row.
   */
  executeAction(action: TableAction<T>, row: T, index: number): void {
    if (!action.disabled) {
      action.action(row, index);
    }
  }

  /**
   * Check if actions column should be displayed.
   */
  hasActions(): boolean {
    return !!(this.actions && this.actions.length > 0);
  }

  /**
   * Retrieve custom styles for a cell based on its column definition and row data.
   */
  getCellStyle(col: TableColumn, row: T): Record<string, string> {
    const value = (row as Record<string, unknown>)[col.key];
    return col.style ? col.style(value, row as unknown) : {};
  }
}