import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AssetModel } from '../../model/asset-model';
import { AssetDetailsHttpModel } from '../../model/http/asset-details-http-model';
import { AssetHttpModel } from '../../model/http/asset-http-model';
import { CurrencyFormatPipe } from '../../pipe/currency-format.pipe';
import { AssetServiceImpl } from '../../service/impl/asset-impl.service';
import { AssetComponent } from '../asset/asset/asset.component';

@Component({
  selector: 'app-asset-table',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe, AssetComponent],
  providers: [DecimalPipe],
  templateUrl: './asset-table.component.html',
  styleUrl: './asset-table.component.css'
})
export class AssetTableComponent implements OnInit {
  headers: string[] = ["Ticker", "Value", "Amount", "Current Value", "Average", "Monthly Return", "DY", "ADY", "Buy more", "Paid Value", "Returns"];
  allAssets: AssetModel[] = [];
  enableAsset: boolean = false;
  assetId!: number;
  constructor(private assetService: AssetServiceImpl) { }

  async ngOnInit(): Promise<void> {
    try {
      const assetsHttp: AssetHttpModel[] = await firstValueFrom(this.assetService.getAll());

      const assetDetailsPromises = assetsHttp.map(async (assetHttp) => {
        const asset: AssetModel = new AssetModel();
        asset.id = assetHttp.id;
        asset.ticker = assetHttp.ticker;
        asset.value = assetHttp.value;

        try {
          const data: AssetDetailsHttpModel = await firstValueFrom(this.assetService.details(assetHttp.id));

          asset.ady = data.ady;
          asset.amount = data.amount;
          asset.average = data.average;
          asset.targetAmount = data.targetAmount;
          asset.currentValue = data.currentValue;
          asset.dy = data.dy;
          asset.monthlyReturn = data.monthlyReturn;
          asset.paidValue = data.paidValue;
          asset.returns = data.returns;
        } catch (error) {
          console.error('Error fetching asset details:', error);
        }

        return asset;
      });

      this.allAssets = await Promise.all(assetDetailsPromises);

    } catch (error) {
      console.error('Error fetching all assets:', error);
    }
  }

  openAssetComponent(id: number) {
    this.assetId = id;
    this.enableAsset = true;
  }

}
