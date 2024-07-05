import { Injectable } from '@angular/core';
import { InvestmentModel } from '../../../component/asset/model/investment-model';

@Injectable({
  providedIn: 'root'
})
export abstract class InvestmentService {

  abstract getConsolidated(assetTypes: string[]): InvestmentModel[];
}
