import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { PaginatedComponent } from "../paginated/paginated.component";
import { TableAction } from '../../../commons/model/table-action';
import { TableColumn } from '../../../commons/model/table-column';

@Component({
  selector: 'app-table-paginated',
  imports: [TableComponent, PaginatedComponent],
  templateUrl: './table-paginated.component.html',
  styleUrl: './table-paginated.component.css',
})
export class TablePaginatedComponent<T = unknown> {

  /** Table: Columns label for render table */
  @Input() columns: TableColumn[] = [];
  /** Table: data for render table */
  @Input() data: T[] = [];
  /** Pagination: Current page number (0-based) */
  @Input() currentPage = 0;

  /** Pagination: Items per page */
  @Input() itemsPerPage = 10;

  /** Pagination: Total pages */
  @Input() totalPages = 0;

  /** Pagination: Emit page selected */
  @Output() selectedPage = new EventEmitter<number>();
  /**
   * Navigate to next page
   */

  /**
   * Optional action buttons to display in each row.
   * If provided, a new "Actions" column will be added.
   */
  @Input() actions?: TableAction<T>[];
  @Output() rowSelected = new EventEmitter<T>();

  onRowClick(row: T): void {
    this.rowSelected.emit(row);
  }

  onSelectPageClick(page: number) {
    this.selectedPage.emit(page);
  }
}
