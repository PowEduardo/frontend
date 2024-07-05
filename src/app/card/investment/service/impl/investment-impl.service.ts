import { Injectable } from '@angular/core';
import { AssetServiceImpl } from '../../asset/service/impl/asset-impl.service';
import { AssetConsolidateHttpModel } from '../../model/http/asset-consolidate-http-model';
import { InvestmentModel } from '../../model/investment-model';
import { InvestmentService } from '../investment.service';

@Injectable({
  providedIn: 'root'
})
export class InvestmentServiceImpl extends InvestmentService {

  constructor(private assetService: AssetServiceImpl) {
    super();
  }
  override getConsolidated(assetsTypes: string[]): InvestmentModel[] {
    var investmentModels: InvestmentModel[] = [];
    assetsTypes.forEach(element => {
      this.assetService.consolidated(element).subscribe((data: AssetConsolidateHttpModel) => {
        var investmentModel: InvestmentModel = new InvestmentModel();
        investmentModel.category = element;
        investmentModel.currentValue = data.currentValue;
        investmentModel.paidValue = data.paidValue;
        investmentModel.returnsValue = data.totalReturns;
        investmentModel.wantedValue = data.wantedValue;
        investmentModels.push(investmentModel);
      });
    });


    return investmentModels;
  }
}
