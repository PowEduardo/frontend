import { MovementModel } from "../../../commons/base/movement/model/movement-model";
import { AssetModel } from "./asset-model";

/**
 * Asset Movement Model
 *
 * Represents a buy/sell transaction (movement) for an investment asset.
 * Extends MovementModel with asset-specific transaction details.
 *
 * @example
 * {
 *   "id": 1,
 *   "date": "2025-01-15",
 *   "amount": 100,
 *   "unitValue": 50.25,
 *   "operation": "BUY",
 *   "value": 5025.00,
 *   "dueDate": null,
 *   "liquidationFee": 0.00,
 *   "asset": { "id": 1, "ticker": "PETR4", "type": "STOCKS", "value": 5025 }
 * }
 */
export class AssetMovementModel extends MovementModel {
  /** Quantity of units/shares acquired or sold */
  amount!: number;

  /** Operation type (BUY, SELL) */
  operation!: string;

  /** Unit price at time of transaction */
  unitValue!: number;

  /** Maturity/expiration date for fixed income assets (if applicable) */
  dueDate!: Date;

  /** Asset information for this transaction */
  asset!: AssetModel;

  /** Transaction fee/commission charged */
  liquidationFee!: number;
}
