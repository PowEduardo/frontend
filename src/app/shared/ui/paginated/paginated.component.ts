import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginated',
  imports: [],
  templateUrl: './paginated.component.html',
  styleUrl: './paginated.component.css',
})
export class PaginatedComponent {

  /** Pagination: Current page number (0-based) */
  @Input() currentPage = 0;

  /** Pagination: Total pages */
  @Input() totalPages = 0;

  /** Pagination: Items per page */
  @Input() itemsPerPage = 10;

  /** Pagination: Emit page selected */
  @Output() selectedPage = new EventEmitter<number>();
  /**
   * Navigate to next page
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.emitPage();
    }
  }

  /**
   * Navigate to previous page
   */
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.emitPage();
    }
  }

  /**
   * Navigate to first page
   */
  firstPage(): void {
    this.currentPage = 0;
    this.emitPage();
  }

  /**
   * Navigate to last page
   */
  lastPage(): void {
    this.currentPage = this.totalPages - 1;
    this.emitPage();
  }

  /**
   * Get current page number (1-based for display)
   */
  getCurrentPageNumber(): number {
    return this.currentPage + 1;
  }

  /**
   * Check if can navigate to next page
   */
  canNextPage(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  /**
   * Check if can navigate to previous page
   */
  canPreviousPage(): boolean {
    return this.currentPage > 0;
  }

  private emitPage() {
    this.selectedPage.emit(this.currentPage);
  }
}
