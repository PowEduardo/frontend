import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestmentModel } from '../../model/investment-model';
import { PieChartModel } from '../../model/pie-chart-model';
import { InvestmentServiceImpl } from '../../service/impl/investment-impl.service';
import { AssetType } from '../enum/asset-type';

@Component({
  selector: 'app-consolidate',
  templateUrl: './consolidate.component.html',
  styleUrl: './consolidate.component.css'
})
export class ConsolidateComponent {
  assetConsolidateList: InvestmentModel[] = [];
  @Output()
  pieValues = new EventEmitter<PieChartModel[]>();
  assetTypes?: string[];
  @Output()
  choosedAssetType = new EventEmitter<string>();

  constructor(
    private service: InvestmentServiceImpl,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.assetTypes === undefined) {
      this.assetTypes = Object.values(AssetType);
    }
    await this.loadAssetTypeConsolidated();
  }

  async loadAssetTypeConsolidated() {
    const chartValues: PieChartModel[] = [];
    this.assetConsolidateList = await this.service.getConsolidated(this.assetTypes!);
    for (const model of this.assetConsolidateList) {
      if (model.category !== 'TOTAL') {
        chartValues.push({ name: model.category, value: model.currentValue });
      }
    }
    this.pieValues.emit(chartValues);
  }

  openAssetTypeDetails(assetType: string) {
    this.choosedAssetType.emit(assetType);
    this.assetTypes! = [assetType];
    this.assetConsolidateList = [];
    this.loadAssetTypeConsolidated();  }
}
