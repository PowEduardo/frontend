import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { InvestmentModel } from '../../model/investment-model';
import { CurrencyFormatPipe } from '../../pipe/currency-format.pipe';
import { InvestmentServiceImpl } from './service/impl/investment-impl.service';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe, RouterOutlet],
  providers: [DecimalPipe],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css'
})
export class InvestmentComponent implements OnInit {
  headers: string[] = ["Category", "Invested", "Current Value", "Wanted Value", "Returns Value"];
  columns: InvestmentModel[] = [];

  constructor(private service: InvestmentServiceImpl,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.columns = this.service.getConsolidated();
  }

  openAssetDetails() {
    this.router.navigate(['home/investments/assets']);

  }
}
