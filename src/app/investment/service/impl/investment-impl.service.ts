import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AssetServiceImpl } from '../../asset/service/impl/asset-impl.service';
import { InvestmentModel } from '../../model/investment-model';
import { InvestmentService } from '../investment.service';

/**
 * Investment Service Implementation
 *
 * Implements consolidated investment data aggregation.
 * Merges asset consolidation data from multiple asset types into
 * a single investment model for dashboard display.
 *
 * Features:
 * - Aggregates multiple asset types into consolidated view
 * - Calculates portfolio totals (excluding PUBLIC_PENSION)
 * - Returns data sorted by category name
 * - Includes precise percentage calculations
 *
 * @see InvestmentService
 * @see AssetServiceImpl
 */
@Injectable({
  providedIn: 'root'
})
export class InvestmentServiceImpl extends InvestmentService {
  private assetService = inject(AssetServiceImpl);

  /**
   * Get consolidated investment data across asset types
   *
   * Aggregates consolidated data from all specified asset types.
   * Calculates portfolio totals and returns sorted by category.
   *
   * @param assetsTypes Array of asset types to consolidate
   * @returns Promise<InvestmentModel[]> Array of consolidated data by category
   *                                      Includes 'TOTAL' if multiple types
   *
   * @example
   * const consolidated = await this.getConsolidated(['STOCKS', 'FUNDS']);
   */
  override async getConsolidated(assetsTypes: string[]): Promise<InvestmentModel[]> {
    // const investmentModels: InvestmentModel[] = [];
    const total: InvestmentModel = new InvestmentModel();
    total.currentValue = 0; 
    total.paidValue = 0;
    total.paidValue = 0;
    total.wantedValue = 0;
    total.returnsValue = 0;
    total.category = 'TOTAL';

    const investmentModels = await Promise.all(assetsTypes.map(async assetType => {
      const data = await firstValueFrom(this.assetService.consolidated(assetType));
      if (assetType !== 'PUBLIC_PENSION') {
        total.currentValue += data.currentValue;
        total.paidValue += data.paidValue;
        total.returnsValue += data.totalReturns;
        total.wantedValue += data.wantedValue;
      }
      const investmentModel: InvestmentModel = new InvestmentModel();
      investmentModel.category = assetType;
      investmentModel.currentValue = data.currentValue;
      investmentModel.paidValue = data.paidValue;
      investmentModel.returnsValue = data.totalReturns;
      investmentModel.wantedValue = data.wantedValue;
      investmentModel.difference = data.difference;
      return investmentModel;
    }));
    if (assetsTypes.length > 1) {
      investmentModels.push(total);
    }
    investmentModels.sort((a, b) => a.category.localeCompare(b.category));
    total.difference = this.roundHalfUp(total.currentValue * 100 / total.paidValue - 100, 2);
    return investmentModels;
  }

  /**
   * Round number with half-up strategy
   *
   * Rounds a number to specified decimal places using
   * banker's rounding (round half up) for percentage calculations.
   *
   * @param value The number to round
   * @param precision Number of decimal places
   * @returns Rounded number value
   *
   * @example
   * roundHalfUp(2.5, 0) // returns 3
   * roundHalfUp(10.125, 2) // returns 10.13
   */
  private roundHalfUp(value: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }
}
