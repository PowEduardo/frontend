import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CurrencyFormatPipe } from '../../pipe/currency-format.pipe';
import { InvestmentServiceImpl } from './service/impl/investment-impl.service';
import { InvestmentModel } from './model/investment-model';
import { AssetMovimentMapperImpl } from './asset/mapper/impl/asset-moviment-mapper-impl';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe, RouterOutlet],
  providers: [DecimalPipe, AssetMovimentMapperImpl],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css'
})
export class InvestmentComponent implements OnInit {
  headers: string[] = ["Category", "Invested", "Current Value", "Wanted Value", "Returns Value"];
  columns: InvestmentModel[] = [];
  assetType: string[] = ['STOCK', 'REIT'];

  constructor(private service: InvestmentServiceImpl,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.columns = this.service.getConsolidated(this.assetType);
  }

  openAssetDetails(assetType: string) {
    this.router.navigate(['home/investments/assets'], { queryParams: { type: assetType } });
  }
}
