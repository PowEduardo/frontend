import { MovementModel } from "../../../commons/base/movement/model/movement-model";

/**
 * Investment Movement Model
 *
 * Base class for all investment transactions (movements).
 * Extends the common MovementModel with investment-specific behavior.
 *
 * Used as parent for:
 * - AssetMovementModel (buy/sell transactions)
 * - AssetMovementReturnModel (dividends/returns)
 * - FixedIncomeMovementModel (fixed income operations)
 *
 * @see AssetMovementModel
 * @see AssetMovementReturnModel
 * @see FixedIncomeMovementModel
 */
export class InvestmentMovementModel extends MovementModel {
}
