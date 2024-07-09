import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CurrencyFormatPipe } from '../../pipe/currency-format.pipe';
import { InvestmentServiceImpl } from './service/impl/investment-impl.service';
import { InvestmentModel } from './model/investment-model';
import { AssetMovimentMapperImpl } from './asset/mapper/impl/asset-moviment-mapper-impl';
import { PieComponent } from './chart/pie/pie.component';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe, RouterOutlet, PieComponent],
  providers: [DecimalPipe, AssetMovimentMapperImpl],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css'
})
export class InvestmentComponent implements OnInit {
  headers: string[] = ["Category", "Invested", "Current Value", "Wanted Value", "Returns Value"];
  columns: InvestmentModel[] = [];
  assetType: string[] = ['STOCK', 'REIT', 'DIRECT_TREASURE', 'PENSION'];
  pieValues: unknown[] = [];
  isPieEnabled: boolean = false;
  constructor(private service: InvestmentServiceImpl,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.loadAssetConsolidated();
  }

  loadAssetConsolidated() {
    this.service.getConsolidated(this.assetType).then(result => {
      this.columns = result;
      this.columns.sort((a, b) => a.category.localeCompare(b.category));
      for (const model of result) {
        this.pieValues.push({ name: model.category, value: model.currentValue });
      }
      this.isPieEnabled = true;
    });
  }

  openAssetDetails(assetType: string) {
    this.router.navigate(['investments', 'assets'], { queryParams: { type: assetType } });
    this.loadAssetConsolidated();
  }
}
