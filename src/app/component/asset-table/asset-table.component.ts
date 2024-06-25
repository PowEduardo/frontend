import { Component, OnInit } from '@angular/core';
import { AssetTableMapperImpl } from '../../mapper/impl/asset-table-mapper-impl';
import { AssetModel } from '../../model/asset-model';
import { AssetHttpModel } from '../../model/http/asset-http-model';
import { MovimentAssetHttpModel } from '../../model/http/moviment-asset-http-model';
import { PageQuery } from '../../model/page-query';
import { TableModel } from '../../model/table-model';
import { AssetServiceImpl } from '../../service/impl/asset-impl.service';
import { AssetMovimentsServiceImpl } from '../../service/impl/asset-moviments-impl.service';
import { MovimentAssetReturnServiceImpl } from '../../service/impl/moviment-asset-return-impl.service';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';
import { MovimentAssetReturnHttpModel } from '../../model/http/moviment-asset-return-http-model';

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
    private assetMovimentsService: AssetMovimentsServiceImpl,
    private tableMapper: AssetTableMapperImpl,
    private returnMovimentService: MovimentAssetReturnServiceImpl) { }

  ngOnInit(): void {
    this.assetService.getAll().subscribe((data: AssetHttpModel[]) => {
      data.forEach(assetHttp => {
        var asset: AssetModel = new AssetModel();
        asset.id = assetHttp.id;
        asset.ticker = assetHttp.ticker;
        asset.value = assetHttp.value;
        var pageQuery: PageQuery = new PageQuery;
        pageQuery.query = "asset:" + assetHttp.id;
        this.assetMovimentsService.getAll(pageQuery).subscribe((data: MovimentAssetHttpModel[]) => {
          var finalAmount: number = 0;
          var amount: number = 0;
          var finalTotalValue: number = 0;
          var totalValue: number = 0;
          for (let moviment of data) {
            if (moviment.operation === "BUY") {
              finalAmount += moviment.amount!;
              amount += moviment.amount!;
              finalTotalValue += moviment.value;
              totalValue += moviment.value;
            } else if (moviment.operation === "SELL") {
              finalAmount = finalAmount - moviment.amount!;
            } else if (moviment.operation === "SPLIT") {
              finalAmount += moviment.amount!;
              amount += moviment.amount!;
              finalTotalValue += moviment.value;
              totalValue += moviment.value;
            }
          }
          if (finalAmount === 0) {
            asset.amount = 0;
            asset.currentValue = 0;
            asset.average = 0;
            asset.paidValue = 0;
          } else {
            asset.amount = finalAmount;
            asset.currentValue = finalAmount * asset.value;
            asset.average = totalValue / amount;
            asset.paidValue = finalTotalValue;
          }
          var pageQuery2: PageQuery = new PageQuery;
          pageQuery2.query = "stock:" + assetHttp.id;
          this.returnMovimentService.getAll(pageQuery2).subscribe((data: MovimentAssetReturnHttpModel[]) => {
            var returnValue = 0;
            var returnValueThisYear = 0;
            var returnValueLastYear = 0;
            data.forEach(element => {
              returnValue += element.value;
              element.date = new Date(element.date);
              if (new Date().getFullYear() === element.date.getFullYear()) {
                returnValueThisYear += element.unitValue;
              } else if ((new Date().getFullYear() - 1) === element.date.getFullYear()) {
                returnValueLastYear += element.unitValue;
              }
            });
            asset.monthlyReturn = returnValueThisYear / new Date().getMonth();
            asset.dy = (asset.monthlyReturn * 12) * 100 / asset.value;
            asset.ady = (asset.monthlyReturn * 12) * 100 / asset.average;
            asset.buyMore = asset.value / asset.monthlyReturn;
            asset.returns = returnValue;
          });
          this.allAssets.push(asset);
        });
      });
      this.tableModel = this.tableMapper.toTableModel(this.allAssets);
    });


  }

}
