import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableComponent } from '../../../commons/base/table/table.component';
import { TableColumn } from '../../../commons/model/table-column';
import { InvestmentModel } from '../../model/investment-model';
import { PieChartModel } from '../../model/pie-chart-model';
import { InvestmentServiceImpl } from '../../service/impl/investment-impl.service';
import { AssetType } from '../enum/asset-type';
import { NotificationService } from '../../../commons/service/notification.service';

/**
 * Consolidate Component
 *
 * Displays consolidated investment data across all asset types with pie chart visualization.
 * Uses standardized app-table component for consistent table rendering.
 */
@Component({
  selector: 'app-consolidate',
  standalone: true,
  imports: [CommonModule, TableComponent],
  providers: [CurrencyPipe],
  templateUrl: './consolidate.component.html',
  styleUrl: './consolidate.component.css'
})
export class ConsolidateComponent implements OnInit {
  /** List of consolidated investment data by category */
  assetConsolidateList: InvestmentModel[] = [];

  /** Table columns configuration */
  columns: TableColumn[] = [];

  /** Emits pie chart data when consolidation changes */
  @Output()
  pieValues = new EventEmitter<PieChartModel[]>();

  /** List of asset types to display */
  assetTypes?: string[];

  /** Emits selected asset type for detail view */
  @Output()
  choosedAssetType = new EventEmitter<string>();

  /** Loading state indicator */
  loading: boolean = false;

  /**
   * Constructor
   * @param service Investment service for data retrieval
   * @param notificationService Notification service for user feedback
   * @param currencyPipe Currency pipe for formatting
   */
  constructor(
    private service: InvestmentServiceImpl,
    private notificationService: NotificationService,
    private currencyPipe: CurrencyPipe
  ) {
    this.initializeColumns();
  }

  /**
   * Initialize table columns configuration
   */
  private initializeColumns(): void {
    this.columns = [
      { key: 'category', label: 'Category' },
      { 
        key: 'paidValue', 
        label: 'Invested',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      },
      { 
        key: 'currentValue', 
        label: 'Current Value',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      },
      { 
        key: 'wantedValue', 
        label: 'Target Value',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      },
      { 
        key: 'returnsValue', 
        label: 'Returns',
        format: (value) => this.currencyPipe.transform(value as number, 'BRL', 'symbol', '1.2-2') || ''
      },
      { 
        key: 'difference', 
        label: 'Difference (%)'
      }
    ];
  }

  /**
   * Initialize component
   * Loads consolidated asset data on component init
   */
  ngOnInit(): void {
    if (this.assetTypes === undefined) {
      this.assetTypes = Object.values(AssetType);
    }
    this.loadAssetTypeConsolidated();
  }

  /**
   * Load consolidated asset data
   * Retrieves and processes consolidated investment data,
   * then emits pie chart values. Handles errors with user notification.
   */
  private loadAssetTypeConsolidated(): void {
    this.loading = true;
    const chartValues: PieChartModel[] = [];
    this.service.getConsolidated(this.assetTypes!).then((consolidatedData) => {
      this.assetConsolidateList = consolidatedData;
      for (const model of this.assetConsolidateList) {
        if (model.category !== 'TOTAL') {
          chartValues.push({ name: model.category, value: model.currentValue });
        }
      }
      this.pieValues.emit(chartValues);
      this.loading = false;
    }).catch((error) => {
      const errorMessage = error?.message || 'Erro desconhecido ao carregar dados consolidados';
      this.notificationService.error(`Erro ao carregar investimentos consolidados: ${errorMessage}`);
      console.error('Error loading consolidated assets:', error);
      this.loading = false;
    });
  }

  /**
   * Open asset type details
   * Filters data for selected asset type and navigates to detail view
   * @param assetType The asset type to view details
   */
  openAssetTypeDetails(assetType: string): void {
    this.choosedAssetType.emit(assetType);
    this.assetTypes = [assetType];
    this.assetConsolidateList = [];
    this.loadAssetTypeConsolidated();
  }

  /**
   * Handle table row click
   * Opens asset type details when a row is selected
   * @param row The selected consolidated asset row
   */
  onRowClick(row: InvestmentModel): void {
    if (row.category !== 'TOTAL') {
      this.openAssetTypeDetails(row.category);
    }
  }
}
