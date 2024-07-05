import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import { CurrencyFormatPipe } from '../../../../pipe/currency-format.pipe';
import { AssetMapperImpl } from '../mapper/impl/asset-mapper-impl';
import { AddAssetComponent } from '../modal/add-asset/add-asset.component';
import { AssetModel } from '../model/asset-model';
import { AssetDetailsHttpModel } from '../model/http/asset-details-http-model';
import { AssetHttpModel } from '../model/http/asset-http-model';
import { PageQuery } from '../model/page-query';
import { AssetServiceImpl } from '../service/impl/asset-impl.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe],
  providers: [DecimalPipe, AssetMapperImpl],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  allAssets: AssetModel[] = [];
  enableAsset: boolean = false;
  type: string = '';

  constructor(private assetService: AssetServiceImpl,
    private route: ActivatedRoute,
    private router: Router,
    private mapper: AssetMapperImpl,
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
        const asset: AssetModel = this.mapper.toModel(assetHttp);

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

  async addAsset() {
    const modalRef = this.modalService.open(AddAssetComponent);
    modalRef.componentInstance.model.type = this.type;
    await modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getAssets('ticker');
      }
    });
  }

  async updateAsset(model: AssetModel) {
    const modalRef = this.modalService.open(AddAssetComponent);
    modalRef.componentInstance.model = model;
    modalRef.componentInstance.updateOperation = true;
    await modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getAssets('ticker');
      }
    });
  }

  sortDY() {
    this.allAssets.sort((a, b) => b.dy - a.dy);
  }

}
