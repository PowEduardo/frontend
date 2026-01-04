import { AssetModel } from "./asset-model";

/**
 * Asset Details Model
 *
 * Extended asset information with comprehensive metrics and analytics.
 * Includes performance, returns, and allocation data.
 * Used in detail views and analysis pages.
 *
 * @example
 * {
 *   "id": 1,
 *   "ticker": "PETR4",
 *   "type": "STOCKS",
 *   "value": 5025.00,
 *   "currentValue": 5125.00,
 *   "paidValue": 5000.00,
 *   "amount": 100,
 *   "average": 50.00,
 *   "returns": 125.00,
 *   "dy": 0.05,
 *   "ady": 0.06,
 *   "monthlyReturn": 2.5,
 *   "targetAmount": 120,
 *   "difference": -20
 * }
 */
export class AssetDetailsModel extends AssetModel {
  /** Annual dividend yield percentage */
  ady!: number;

  /** Total quantity of units/shares held */
  amount!: number;

  /** Average cost per unit (paidValue / amount) */
  average!: number;

  /** Current total market value */
  currentValue!: number;

  /** Absolute profit/loss (currentValue - paidValue) */
  difference!: number;

  /** Dividend yield percentage */
  dy!: number;

  /** Last dividend/return received */
  lastReturn!: number;

  /** Monthly return percentage */
  monthlyReturn!: number;

  /** Total amount invested (cost basis) */
  paidValue!: number;

  /** Total returns earned */
  returns!: number;

  /** Target quantity to achieve */
  targetAmount!: number;

  /** Asset indexer/reference (for fixed income) */
  indexer!: string;

  /** Annual interest rate (for fixed income) */
  interestRate!: number;

  /** Projected next dividend value */
  nextDividend!: number;
}
