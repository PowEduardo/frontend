import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, Input } from '@angular/core';
import { ConsolidateComponent } from './asset/consolidate/consolidate.component';
import { AssetTypeDetailsComponent } from './asset/details/asset-type-details.component';
import { PieComponent } from './chart/pie/pie.component';
import { InvestmentModel } from './model/investment-model';
import { PieChartModel } from './model/pie-chart-model';

registerLocaleData(localePt, 'pt-BR');

/**
 * Investment Component
 *
 * Root component for the Investment module.
 * Displays consolidated investment overview with pie chart and asset consolidation.
 */
@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [
    ConsolidateComponent,
    PieComponent,
    AssetTypeDetailsComponent
  ],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css'
})
export class InvestmentComponent {
  /** Consolidated investment data by category */
  columns: InvestmentModel[] = [];

  /** Pie chart values for visualization */
  @Input()
  pieValues?: PieChartModel[];

  /** Selected asset type for filtering */
  @Input()
  choosedType?: string;
}
