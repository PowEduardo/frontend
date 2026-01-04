/**
 * Page Model
 *
 * Represents a paginated response from the backend.
 * Contains page content and metadata for pagination handling.
 *
 * Generic type T represents the content type (Asset, Movement, etc).
 *
 * @example
 * {
 *   "content": [{ id: 1, ticker: "PETR4", ... }],
 *   "pageable": { "pageNumber": 0, "pageSize": 10, "offset": 0 },
 *   "last": false,
 *   "totalPages": 5,
 *   "totalElements": 47,
 *   "first": true,
 *   "size": 10,
 *   "number": 0,
 *   "numberOfElements": 10,
 *   "empty": false
 * }
 */
export class PageModel<T> {
  /** Items on this page */
  content!: T[];

  /** Pagination metadata */
  pageable!: Pageable;

  /** Whether this is the last page */
  last!: boolean;

  /** Total number of pages */
  totalPages!: number;

  /** Total number of elements across all pages */
  totalElements!: number;

  /** Whether this is the first page */
  first!: boolean;

  /** Page size (number of items per page) */
  size!: number;

  /** Current page number (0-indexed) */
  number!: number;

  /** Number of elements on this page */
  numberOfElements!: number;

  /** Whether the page is empty */
  empty!: boolean;
}

/**
 * Pageable Model
 *
 * Pagination metadata for page requests.
 *
 * @example
 * { "pageNumber": 0, "pageSize": 10, "offset": 0 }
 */
export class Pageable {
  /** Current page number (0-indexed) */
  pageNumber!: number;

  /** Items per page */
  pageSize!: number;

  /** Offset from start (pageNumber * pageSize) */
  offset!: number;
}