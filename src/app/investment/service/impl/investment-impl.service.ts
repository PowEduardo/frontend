import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AssetServiceImpl } from '../../asset/service/impl/asset-impl.service';
import { InvestmentModel } from '../../model/investment-model';
import { InvestmentService } from '../investment.service';

@Injectable({
  providedIn: 'root'
})
export class InvestmentServiceImpl extends InvestmentService {

  constructor(private assetService: AssetServiceImpl) {
    super();
  }
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

  roundHalfUp(value: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }
}
