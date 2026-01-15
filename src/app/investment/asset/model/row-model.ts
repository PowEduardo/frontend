/**
 * Row Model
 *
 * Represents a single row of data in a table.
 * Contains item ID and column values for rendering.
 *
 * @example
 * {
 *   "id": 1,
 *   "columnValues": ["PETR4", "STOCKS", "5025.00", "2.5%", "100"]
 * }
 */
export class RowModel {
  /** Unique identifier for the row item */
  id: number | undefined;

  /** Array of string values to display in each column */
  columnValues: string[] | undefined;
}
