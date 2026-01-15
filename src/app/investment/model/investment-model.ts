/**
 * Investment Model
 *
 * Represents consolidated investment data for a category (asset type).
 * Used for dashboard display and analysis of portfolio composition.
 *
 * @example
 * {
 *   "category": "STOCKS",
 *   "currentValue": 25000.00,
 *   "paidValue": 20000.00,
 *   "wantedValue": 30000.00,
 *   "returnsValue": 5000.00,
 *   "difference": -5000.00
 * }
 */
export class InvestmentModel {
  /** Asset type/category identifier (STOCKS, FUNDS, FIXED_INCOME, PUBLIC_PENSION, etc) */
  category!: string;

  /** Current market value of all assets in this category */
  currentValue!: number;

  /** Total amount invested (principal/cost basis) */
  paidValue!: number;

  /** Target/desired value for this category */
  wantedValue!: number;

  /** Total returns earned (currentValue - paidValue) */
  returnsValue!: number;

  /** Difference from target (currentValue - wantedValue) */
  difference!: number;
}
