import { Injectable } from '@angular/core';
import { InvestmentModel } from '../model/investment-model';

/**
 * Investment Service (Abstract Base)
 *
 * Defines the contract for investment data operations.
 * Handles consolidated investment data across all asset types.
 *
 * Implementation: InvestmentServiceImpl
 *
 * @see InvestmentServiceImpl
 * @see InvestmentModel
 */
@Injectable({
  providedIn: 'root'
})
export abstract class InvestmentService {

  /**
   * Get consolidated investment data
   *
   * Retrieves aggregated investment information grouped by asset type.
   * Calculates totals across all specified asset types.
   *
   * @param assetTypes Array of asset type identifiers (e.g., ['STOCKS', 'FUNDS'])
   * @returns Promise resolving to array of InvestmentModel with consolidated data
   *          Includes 'TOTAL' entry if multiple asset types provided
   *
   * @example
   * const consolidated = await service.getConsolidated(['STOCKS', 'FUNDS']);
   * // Result:
   * // [
   * //   { category: 'FUNDS', currentValue: 5000, paidValue: 4000, ... },
   * //   { category: 'STOCKS', currentValue: 15000, paidValue: 10000, ... },
   * //   { category: 'TOTAL', currentValue: 20000, paidValue: 14000, ... }
   * // ]
   */
  abstract getConsolidated(assetTypes: string[]): Promise<InvestmentModel[]>;
}
