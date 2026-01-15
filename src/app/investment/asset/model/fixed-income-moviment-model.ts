import { InvestmentMovementModel } from "./movement-model";

/**
 * Fixed Income Movement Model
 *
 * Represents transactions for fixed income assets (bonds, treasuries, CDBs).
 * Extends InvestmentMovementModel with fixed income specific fields.
 *
 * @example
 * {
 *   "id": 1,
 *   "date": "2025-01-15",
 *   "value": 5000.00,
 *   "dueDate": "2026-01-15",
 *   "operation": "BUY"
 * }
 */
export class FixedIncomeMovementModel extends InvestmentMovementModel {
  /** Maturity/expiration date for this fixed income security */
  dueDate?: Date;

  /** Operation type (BUY, SELL, REDEEM) */
  operation?: string;
}
