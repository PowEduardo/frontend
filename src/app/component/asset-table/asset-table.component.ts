import { Component, OnInit } from '@angular/core';
import { AssetTableMapperImpl } from '../../mapper/impl/asset-table-mapper-impl';
import { AssetModel } from '../../model/asset-model';
import { AssetDetailsHttpModel } from '../../model/http/asset-details-http-model';
import { AssetHttpModel } from '../../model/http/asset-http-model';
import { TableModel } from '../../model/table-model';
import { AssetServiceImpl } from '../../service/impl/asset-impl.service';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-asset-table',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './asset-table.component.html',
  styleUrl: './asset-table.component.css'
})
export class AssetTableComponent implements OnInit {
  private allAssets: AssetModel[] = [];
  tableModel!: TableModel;
  constructor(private assetService: AssetServiceImpl,
    private tableMapper: AssetTableMapperImpl) { }

  ngOnInit(): void {
    this.assetService.getAll().subscribe((data: AssetHttpModel[]) => {
      data.forEach(assetHttp => {
        var asset: AssetModel = new AssetModel();
        asset.id = assetHttp.id;
        asset.ticker = assetHttp.ticker;
        asset.value = assetHttp.value;
        this.assetService.details(assetHttp.id).subscribe((data: AssetDetailsHttpModel) => {
          asset.ady = data.ady;
          asset.amount = data.amount;
          asset.average = data.average;
          asset.targetAmount = data.targetAmount;
          asset.currentValue = data.currentValue;
          asset.dy = data.dy;
          asset.monthlyReturn = data.monthlyReturn;
          asset.paidValue = data.paidValue;
          asset.returns = data.returns;
          this.allAssets.push(asset);
        }, (error) => {
          console.log(error);
        });
      });
      this.tableModel = this.tableMapper.toTableModel(this.allAssets);
    });


  }

}
