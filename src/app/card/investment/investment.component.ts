import { Component, OnInit } from '@angular/core';
import { InvestmentServiceImpl } from './service/impl/investment-impl.service';
import { InvestmentModel } from '../../model/investment-model';
import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';
import { CurrencyFormatPipe } from '../../pipe/currency-format.pipe';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe],
  providers: [DecimalPipe],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css'
})
export class InvestmentComponent implements OnInit {
  headers: string[] = ["Category", "Invested", "Current Value", "Wanted Value", "Returns Value"];
  columns: InvestmentModel[] = [];

  constructor(private service: InvestmentServiceImpl) {
  }
  ngOnInit(): void {
    this.columns = this.service.getConsolidated();
  }
}
