import { DecimalPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { PageQuery } from '../../../commons/base/model/page-query';
import { TableComponent } from '../../../commons/base/table/table.component';
import { TableColumn } from '../../../commons/model/table-column';
import { TableAction } from '../../../commons/model/table-action';
import { PieChartModel } from '../../model/pie-chart-model';
import { AddAssetComponent } from '../modal/add-asset/add-asset.component';
import { AssetModel } from '../model/asset-model';
import { AssetDetailsModel } from '../model/asset-model-details';
import { MovementsComponent } from "../movements/movements.component";
import { OperationsComponent } from '../operations/operations.component';
import { ReturnsComponent } from "../returns/returns.component";
import { AssetServiceImpl } from '../service/impl/asset-impl.service';
import { NotificationService } from '../../../commons/service/notification.service';

/**
 * Asset Type Details Component
 * Displays detailed asset information in a standardized table with actions
 */
@Component({
  selector: 'app-asset-type-details',
  standalone: true,
  imports: [CommonModule, TableComponent, OperationsComponent, MovementsComponent, ReturnsComponent],
  providers: [DecimalPipe, CurrencyPipe],
  templateUrl: './asset-type-details.component.html',
  styleUrl: './asset-type-details.component.css'
})
export class AssetTypeDetailsComponent implements OnInit {
  allAssets: AssetDetailsModel[] = [];

  columns: TableColumn[] = [];
  assetActions: TableAction<AssetDetailsModel>[] = [];

  @Input() type: string = '';

  private sort: string = 'ticker';
  loading: boolean = true;

  @Output() pieValuesChange = new EventEmitter<PieChartModel[]>();

  showAssetOperations?: number;
  isMovementsEnabled: boolean = false;
  isReturnsEnabled: boolean = false;

  constructor(
    private assetService: AssetServiceImpl,
    private modalService: NgbModal,
    private currencyPipe: CurrencyPipe,
    private notificationService: NotificationService
  ) {
    this.initializeColumns();
    this.initializeActions();
  }

  /**
   * Initialize table columns configuration
   */
  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'Id' },
      { key: 'ticker', label: 'Ticker' },
      {
        key: 'value',
        label: 'Value',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      },
      { key: 'amount', label: 'Amount' },
      {
        key: 'currentValue',
        label: 'Current Value',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      },
      {
        key: 'average',
        label: 'Average',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      },
      { key: 'difference', label: 'Difference (%)' },
      {
        key: 'lastReturn',
        label: 'Last Return',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      },
      { key: 'dy', label: 'DY' },
      { key: 'ady', label: 'ADY' },
      { key: 'targetAmount', label: 'Target Amount' },
      {
        key: 'returns',
        label: 'Returns',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      },
      { key: 'nextDividend', label: 'Next Dividend' }
    ];
  }

  /**
   * Initialize table actions
   */
  private initializeActions(): void {
    this.assetActions = [
      {
        label: 'Details',
        icon: 'bi bi-info-circle',
        action: (row) => this.openAssetOperations(row.id)
      },
      {
        label: 'Edit',
        icon: 'bi bi-pencil',
        action: (row) => this.updateAsset(row)
      }
    ];
  }

  async ngOnInit(): Promise<void> {
    this.getAssets(this.sort);
  }

  openAssetOperations(id: number) {
    if (id === this.showAssetOperations) {
      this.showAssetOperations = undefined;
    } else {
      this.showAssetOperations = id;
    }
  }

  /**
   * Load assets with sorting
   */
  async getAssets(attribute: string | null): Promise<void> {
    try {
      const query: PageQuery = new PageQuery();
      query.query = "type:" + this.type;
      if (attribute) {
        query.sort = attribute;
        this.sort = attribute;
      }
      await this.assetService.getAll(query).subscribe(
        {
          next: async (asset: AssetModel[]) => {
            const assetDetailsList: AssetDetailsModel[] = [];
            const pieValues: PieChartModel[] = [];

            const promises = asset.map(async (asset) => {
              let assetModel: AssetDetailsModel = new AssetDetailsModel();

              const result = await forkJoin({
                asset: this.assetService.findById(asset.id),
                assetDetails: this.assetService.details(asset.id)
              }).toPromise();

              assetModel = this.toModelWithDetails(result!.assetDetails, result!.asset);
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
          },
          error: (error) => {
            this.notificationService.error(`Erro ao carregar Assets: ${error.error.message}`);
          }
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

  async updateAsset(model: AssetDetailsModel) {
    const modalRef = this.modalService.open(AddAssetComponent);
    const assetModel: AssetModel = new AssetModel();
    assetModel.id = model.id;
    assetModel.ticker = model.ticker;
    assetModel.type = model.type;
    assetModel.value = model.value;
    modalRef.componentInstance.model = assetModel;
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

  toModelWithDetails(response: AssetDetailsModel, model: AssetModel): AssetDetailsModel {
    response.id = model.id;
    response.ticker = model.ticker;
    response.type = model.type;
    response.value = model.value;
    return response;
  }
}
