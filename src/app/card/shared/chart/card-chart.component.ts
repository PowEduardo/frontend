import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { CardService } from '../../service/card.service';
import { DashboardService } from '../../../commons/service/dashboard.service';
import { NotificationService } from '../../../commons/service/notification.service';

/**
 * Card Chart Component
 * Displays payment history as a line chart.
 * Reutilizable component that can show data for all cards or a specific card.
 */
@Component({
  selector: 'app-card-chart',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  template: `
    <div class="card-chart-container">
      @if (loading) {
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading chart...</span>
        </div>
      } @else if (chartData && chartData.length > 0) {
        <div class="card-chart-wrapper">
          <h5>{{ title }}</h5>
          <ngx-charts-line-chart
            [results]="chartData"
            [scheme]="'ocean'"
            [legend]="true"
            [xAxis]="true"
            [yAxis]="true"
            [showGridLines]="true"
            [autoScale]="true">
          </ngx-charts-line-chart>
        </div>
      } @else {
        <div class="alert alert-info">No payment data available</div>
      }
    </div>
  `,
  styles: [`
    .card-chart-container {
      margin: 20px 0;
    }
    
    .card-chart-wrapper {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .card-chart-wrapper h5 {
      margin-bottom: 20px;
      color: #333;
    }
    
    :host ::ng-deep {
      .ngx-charts-legend {
        margin-top: 10px;
      }
    }
  `]
})
export class CardChartComponent implements OnInit, OnChanges {
  @Input() cardId?: number;
  @Input() title: string = 'Valor Pago - Cartões';

  chartData: unknown[] = [];
  loading: boolean = false;

  constructor(
    private cardService: CardService,
    private dashboardService: DashboardService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cardId'] && !changes['cardId'].firstChange) {
      this.loadChartData();
    }
  }

  /**
   * Load payment history data for chart
   * If cardId is provided, loads specific card data
   * Otherwise, loads aggregated data for all cards
   */
  private loadChartData(): void {
    this.loading = true;

    if (this.cardId) {
      this.title = `Valor Pago - Cartão #${this.cardId}`;
      this.loadCardSpecificData(this.cardId);
    } else {
      this.title = 'Valor Pago - Todos os Cartões';
      this.loadAllCardsData();
    }
  }

  /**
   * Load specific card payment data
   */
  private loadCardSpecificData(cardId: number): void {
    this.dashboardService.getCardPaidAmount(cardId).subscribe({
      next: (data) => {

        this.chartData = [
          {
            name: `Cartão #${cardId}`,
            series: data!.details!.map((details) => ({
              name: details.referenceMonth,
              value: details.value
            }))
          }
        ];
        this.loading = false;
      },
      error: () => {
        this.notificationService.error('Erro ao carregar dados do gráfico');
        this.loading = false;
      }
    });
  }

  /**
   * Load aggregated payment data for all cards
   */
  private loadAllCardsData(): void {
    this.dashboardService.getTotalPaidAmountAllCards().subscribe({
      next: (data) => {
        this.chartData = [
          {
            name: 'Total Pago',
            series: data!.details!.map((details) => ({
              name: details.referenceMonth,
              value: details.value
            }))
          }
        ];
        this.loading = false;
      },
      error: () => {
        this.notificationService.error('Erro ao carregar dados do gráfico');
        this.loading = false;
      }
    });
  }
}
