import { Injectable } from '@angular/core';
import { InvestmentModel } from '../../../model/investment-model';

@Injectable({
  providedIn: 'root'
})
export abstract class InvestmentService {

  abstract getConsolidated(): InvestmentModel[];
}
