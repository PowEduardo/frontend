import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, Input, OnInit, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AssetModel } from '../../model/asset-model';
import { AssetDetailsHttpModel } from '../../model/http/asset-details-http-model';
import { AssetHttpModel } from '../../model/http/asset-http-model';
import { CurrencyFormatPipe } from '../../pipe/currency-format.pipe';
import { AssetServiceImpl } from '../../service/impl/asset-impl.service';
import { AssetComponent } from '../asset/asset/asset.component';
import { PageQuery } from '../../model/page-query';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAssetComponent } from '../../modal/add-asset/add-asset.component';

@Component({
  selector: 'app-asset-table',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe, AssetComponent],
  providers: [DecimalPipe],
  templateUrl: './asset-table.component.html',
  styleUrl: './asset-table.component.css'
})
export class AssetTableComponent implements OnInit {
  allAssets: AssetModel[] = [];
  enableAsset: boolean = false;
  type: string = '';

  constructor(private assetService: AssetServiceImpl,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  async ngOnInit(): Promise<void> {
    await this.route.queryParams.subscribe(params => {
      this.type = params['type'];
    });
    this.getAssets('ticker');
  }

  openAssetComponent(id: number) {
    this.router.navigate(['/home/investments/assets/', id]);
  }

  async getAssets(attribute: string | null): Promise<void> {
    try {
      var query: PageQuery = new PageQuery();
      query.query = "type:" + this.type;
      if (attribute) {
        query.sort = attribute;
      }
      const assetsHttp: AssetHttpModel[] = await firstValueFrom(this.assetService.getAll(query));

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

  addAsset() {
    const modalRef = this.modalService.open(AddAssetComponent);
    modalRef.componentInstance.model.type = this.type;
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getAssets('ticker');
      }
    });
  }

  updateAsset(model: AssetModel) {
    const modalRef = this.modalService.open(AddAssetComponent);
    modalRef.componentInstance.model = model;
    modalRef.componentInstance.updateOperation = true;
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getAssets('ticker');
      }
    });
  }

  sortDY() {
    this.allAssets.sort((a, b) => b.dy - a.dy);
  }

}
