import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { CurrencyFormatPipe } from '../../../pipe/currency-format.pipe';
import { PieChartModel } from '../../model/pie-chart-model';
import { AssetComponent } from '../asset.component';
import { AssetMapperImpl } from '../mapper/impl/asset-mapper-impl';
import { AddAssetComponent } from '../modal/add-asset/add-asset.component';
import { AssetModel } from '../model/asset-model';
import { AssetHttpModel } from '../model/http/asset-http-model';
import { PageQuery } from '../model/page-query';
import { MovementsComponent } from "../movements/movements.component";
import { OperationsComponent } from '../operations/operations.component';
import { ReturnsComponent } from "../returns/returns.component";
import { AssetServiceImpl } from '../service/impl/asset-impl.service';
import { AssetMovementMapperImpl } from '../mapper/impl/asset-movement-mapper-impl';

@Component({
  selector: 'app-asset-type-details',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe, AssetComponent, OperationsComponent, MovementsComponent, ReturnsComponent],
  providers: [DecimalPipe, AssetMapperImpl, AssetMovementMapperImpl],
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
  isMovimentsEnabled: boolean = false;
  isReturnsEnabled: boolean = false;

  constructor(private assetService: AssetServiceImpl,
    private route: ActivatedRoute,
    private router: Router,
    private mapper: AssetMapperImpl,
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
      this.assetService.getAll(query).subscribe(async (assetHttp: AssetHttpModel[]) => {
        const assetDetailsList: AssetModel[] = [];
        const pieValues: PieChartModel[] = [];

        const promises = assetHttp.map(async (asset) => {
          let assetModel: AssetModel = new AssetModel();

          const result = await forkJoin({
            asset: this.assetService.findById(asset.id),
            assetDetails: this.assetService.details(asset.id)
          }).toPromise();

          assetModel = this.mapper.toModel(result!.asset);
          this.mapper.toModelWithDetails(result!.assetDetails, assetModel);
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
    this.isMovimentsEnabled = !this.isMovimentsEnabled;
  }

  openReturns() {
    this.isMovimentsEnabled = false;
    this.isReturnsEnabled = !this.isReturnsEnabled;
  }
}
