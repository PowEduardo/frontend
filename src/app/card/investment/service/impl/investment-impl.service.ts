import { Injectable } from '@angular/core';
import { InvestmentModel } from '../../../../model/investment-model';
import { AssetServiceImpl } from '../../../../service/impl/asset-impl.service';
import { InvestmentService } from '../investment.service';
import { AssetConsolidateHttpModel } from '../../../../model/http/asset-consolidate-http-model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentServiceImpl extends InvestmentService {

  constructor(private assetService: AssetServiceImpl) {
    super();
  }
  override getConsolidated(): InvestmentModel[] {
    var investmentModels: InvestmentModel[] = [];
    var investmentModel: InvestmentModel = new InvestmentModel();
    investmentModel.category = "Stock";
    this.assetService.consolidated().subscribe((data: AssetConsolidateHttpModel) => {
      investmentModel.currentValue = data.currentValue;
      investmentModel.paidValue = data.paidValue;
      investmentModel.returnsValue = data.totalReturns;
      investmentModel.wantedValue = data.wantedValue;
      console.log(data);
    });
    investmentModels.push(investmentModel);

    return investmentModels;
  }
}
