import { InvestmentMovementModel } from "./movement-model";

/**
 * Asset Movement Return Model
 *
 * Represents a return/dividend/distribution transaction from an investment.
 * Extends InvestmentMovementModel with return-specific details.
 *
 * @example
 * {
 *   "id": 1,
 *   "date": "2025-01-15",
 *   "value": 150.00,
 *   "amount": 100,
 *   "unitValue": 1.50,
 *   "operation": "DIVIDEND",
 *   "exDividendDate": "2025-01-10",
 *   "asset": "PETR4",
 *   "irFee": 0.00
 * }
 */
export class AssetMovementReturnModel extends InvestmentMovementModel {
  /** Return type (DIVIDEND, JCP, DISTRIBUTION) */
  operation!: string;

  /** Quantity of units that received the return */
  amount!: number;

  /** Value per unit returned */
  unitValue!: number;

  /** Ex-dividend date (last date to be eligible for this return) */
  exDividendDate!: Date;

  /** Asset identifier/ticker that generated the return */
  asset!: string;

  /** Income tax withheld on return (in Brazil) */
  irFee!: number;
}
