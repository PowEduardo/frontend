import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, Input } from '@angular/core';
import { InvestmentModule } from './investment.module';
import { InvestmentModel } from './model/investment-model';
import { PieChartModel } from './model/pie-chart-model';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [InvestmentModule],
  providers: [],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css'
})
export class InvestmentComponent {
  columns: InvestmentModel[] = [];
  @Input()
  pieValues?: PieChartModel[];
  @Input()
  choosedType?: string;
}
