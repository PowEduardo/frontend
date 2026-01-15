/**
 * Asset Model
 *
 * Represents a single investment asset (stock, fund, bond, etc).
 * Contains basic asset information for listings and CRUD operations.
 *
 * @example
 * {
 *   "id": 1,
 *   "ticker": "PETR4",
 *   "type": "STOCKS",
 *   "value": 5000.00
 * }
 */
export class AssetModel {
  /** Unique asset identifier */
  id!: number;

  /** Asset ticker/symbol (e.g., PETR4, FVVV11, TESOURO) */
  ticker!: string;

  /** Asset type/category (STOCKS, FUNDS, FIXED_INCOME, PUBLIC_PENSION) */
  type!: string;

  /** Current market value of this asset */
  value!: number;
}
