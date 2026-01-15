import { RowModel } from "./row-model";

/**
 * Table Model
 *
 * Represents tabular data for display in investment listings.
 * Contains headers and rows for dynamic table rendering.
 *
 * @example
 * {
 *   "headers": ["Ticker", "Type", "Value", "Return %"],
 *   "body": [
 *     { "id": 1, "columnValues": ["PETR4", "STOCKS", "5025.00", "2.5%"] },
 *     { "id": 2, "columnValues": ["FVVV11", "FUNDS", "1500.00", "-1.2%"] }
 *   ]
 * }
 */
export class TableModel {
  /** Column headers for the table */
  headers!: string[];

  /** Rows of data to display */
  body!: RowModel[];
}
