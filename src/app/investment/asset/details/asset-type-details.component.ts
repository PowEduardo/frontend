import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { PieChartModel } from '../../model/pie-chart-model';
import { AssetComponent } from '../asset.component';
import { AddAssetComponent } from '../modal/add-asset/add-asset.component';
import { AssetModel } from '../model/asset-model';
import { AssetDetailsHttpModel } from '../model/http/asset-details-http-model';
import { PageQuery } from '../model/page-query';
import { MovementsComponent } from "../movements/movements.component";
import { OperationsComponent } from '../operations/operations.component';
import { ReturnsComponent } from "../returns/returns.component";
import { AssetServiceImpl } from '../service/impl/asset-impl.service';

@Component({
  selector: 'app-asset-type-details',
  standalone: true,
  imports: [CommonModule, AssetComponent, OperationsComponent, MovementsComponent, ReturnsComponent],
  providers: [DecimalPipe],
  templateUrl: './asset-type-details.component.html',
  styleUrl: './asset-type-details.component.css'
})
export class AssetTypeDetailsComponent implements OnInit {
  allAssets: AssetModel[] = [];
  @Input()
  type: string = '';
  private sort: string = 'ticker';
  loading: boolean = true;
  @Output()
  pieValuesChange = new EventEmitter<PieChartModel[]>();
  showAssetOperations?: number;
  isMovementsEnabled: boolean = false;
  isReturnsEnabled: boolean = false;

  constructor(private assetService: AssetServiceImpl,
    private modalService: NgbModal
  ) { }

  async ngOnInit(): Promise<void> {
    this.getAssets('ticker');
  }

  openAssetOperations(id: number) {
    if (id === this.showAssetOperations) {
      this.showAssetOperations = undefined;
    } else {
    this.showAssetOperations = id;
    }
  }

  async getAssets(attribute: string | null): Promise<void> {
    try {
      const query: PageQuery = new PageQuery();
      query.query = "type:" + this.type;
      if (attribute) {
        query.sort = attribute;
      }
      this.assetService.getAll(query).subscribe(async (asset: AssetModel[]) => {
        const assetDetailsList: AssetModel[] = [];
        const pieValues: PieChartModel[] = [];

        const promises = asset.map(async (asset) => {
          let assetModel: AssetModel = new AssetModel();

          const result = await forkJoin({
            asset: this.assetService.findById(asset.id),
            assetDetails: this.assetService.details(asset.id)
          }).toPromise();

          this.toModelWithDetails(result!.assetDetails, result!.asset);
          if (assetModel.currentValue !== 0) {
            pieValues.push({ name: assetModel.ticker, value: assetModel.currentValue });
          }
          assetDetailsList.push(assetModel!);
        });

        // Wait for all promises to complete
        await Promise.all(promises);

        // Set the values after all asynchronous operations are complete
        this.allAssets = assetDetailsList;
        this.pieValuesChange.emit(pieValues);
      });
      
      this.loading = false;
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

  sortByDY() {
    if (this.sort === 'DY') {
      this.allAssets.sort((a, b) => a.dy - b.dy);
      this.sort = '-' + 'DY';
    } else {
      this.sort = 'DY';
      this.allAssets.sort((a, b) => b.dy - a.dy);
    }
    
  }

  sortDifference() {
    if (this.sort === 'difference') {
      this.allAssets.sort((a, b) => b.difference - a.difference);
      this.sort = '-difference'
    } else {
      this.allAssets.sort((a, b) => a.difference - b.difference);
      this.sort = 'difference';
    }
  }
  openMovements() {
    this.isReturnsEnabled = false;
    this.isMovementsEnabled = !this.isMovementsEnabled;
  }

  openReturns() {
    this.isMovementsEnabled = false;
    this.isReturnsEnabled = !this.isReturnsEnabled;
  }

  toModelWithDetails(response: AssetDetailsHttpModel, model: AssetModel): AssetModel {
      model.ady = response.ady;
      model.amount = response.amount;
      model.average = response.average;
      model.currentValue = response.currentValue;
      model.difference = response.difference;
      model.dy = response.dy;
      model.lastReturn = response.lastReturn;
      model.monthlyReturn = response.monthlyReturn;
      model.paidValue = response.paidValue;
      model.returns = response.returns;
      model.targetAmount = response.targetAmount;
      return model;
    }
}
