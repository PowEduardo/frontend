import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../../service/card.service';
import { DashboardService } from '../../../commons/service/dashboard.service';
import { NotificationService } from '../../../commons/service/notification.service';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

/**
 * Card Chart Component
 * Displays payment history as a line chart using ECharts.
 * Reusable component that can show data for all cards or a specific card.
 */
@Component({
  selector: 'app-card-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-chart-container">
      @if (loading) {
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading chart...</span>
        </div>
      }
      <!-- Chart element must always be in DOM -->
      <div #chartElement
        class="chart-element"
        [style.display]="chartData && chartData.length > 0 ? 'block' : 'none'">
      </div>
      @if (!loading && (!chartData || chartData.length === 0)) {
        <div class="alert alert-info">No payment data available</div>
      }
    </div>
  `,
  styles: [`
    .card-chart-container {
      margin: 20px 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .chart-element {
      width: 100%;
      flex: 1;
      min-height: 400px;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      box-sizing: border-box;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .spinner-border {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    }

    .alert {
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class CardChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('chartElement', { static: false }) chartElement!: ElementRef;
  
  @Input() cardId?: number;
  @Input() title: string = 'Valor Pago - Cartões';

  chartData: any[] = [];
  chartOptions: EChartsOption = {};
  loading: boolean = false;
  private chart: echarts.ECharts | null = null;
  private resizeListener: (() => void) | null = null;

  constructor(
    private cardService: CardService,
    private dashboardService: DashboardService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadChartData();
  }

  ngAfterViewInit(): void {
    // Initialize chart immediately when view is ready
    // Data will be loaded separately via loadChartData()
    console.log('AfterViewInit - initializing chart');
    this.initChart();
    this.setupResizeListener();
  }

  ngOnDestroy(): void {
    // Clean up resize listener
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    // Dispose of chart instance
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cardId'] && !changes['cardId'].firstChange) {
      this.loadChartData();
    }
  }

  /**
   * Setup window resize listener to make chart responsive
   */
  private setupResizeListener(): void {
    this.resizeListener = () => {
      if (this.chart) {
        console.log('Resizing chart...');
        this.chart.resize();
      }
    };
    window.addEventListener('resize', this.resizeListener);
  }

  /**
   * Initialize the ECharts instance
   */
  private initChart(): void {
    if (this.chart) {
      console.log('Chart already initialized');
      return;
    }

    if (!this.chartElement) {
      console.warn('chartElement reference not available');
      return;
    }

    const element = this.chartElement.nativeElement;
    if (!element) {
      console.warn('chartElement.nativeElement is null');
      return;
    }

    try {
      console.log('Initializing ECharts with element:', element);
      this.chart = echarts.init(element);
      console.log('✅ ECharts initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize ECharts:', error);
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
    console.log('Loading card specific data for cardId:', cardId);
    this.dashboardService.getCardPaidAmount(cardId).subscribe({
      next: (data) => {
        console.log('Card data received:', data);
        this.chartData = data!.details!.map((details) => ({
          name: details.referenceMonth,
          value: details.value
        }));
        console.log('Chart data transformed:', this.chartData);
        this.updateChart();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading card data:', err);
        this.notificationService.error('Erro ao carregar dados do gráfico');
        this.loading = false;
      }
    });
  }

  /**
   * Load aggregated payment data for all cards
   */
  private loadAllCardsData(): void {
    console.log('Loading all cards data');
    this.dashboardService.getTotalPaidAmountAllCards().subscribe({
      next: (data) => {
        console.log('All cards data received:', data);
        this.chartData = data!.details!.map((details) => ({
          name: details.referenceMonth,
          value: details.value
        }));
        console.log('Chart data transformed:', this.chartData);
        this.updateChart();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading all cards data:', err);
        this.notificationService.error('Erro ao carregar dados do gráfico');
        this.loading = false;
      }
    });
  }

  /**
   * Update chart options based on data
   */
  private updateChart(): void {
    if (!this.chart) {
      console.error('❌ Chart not initialized');
      return;
    }

    if (this.chartData.length === 0) {
      console.warn('⚠️ No chart data available');
      return;
    }

    const months = this.chartData.map(item => item.name);
    const values = this.chartData.map(item => item.value);

    console.log('📊 Updating chart with data:', { months, values });

    this.chartOptions = {
      color: ['#5470c6'],
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          if (Array.isArray(params)) {
            const param = params[0];
            if (param) {
              return `${param.axisValue}<br/>${this.title}: R$ ${Number(param.value).toFixed(2)}`;
            }
          }
          return '';
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: {
          interval: 0,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => `R$ ${value.toFixed(0)}`
        }
      },
      series: [
        {
          name: this.title,
          data: values,
          type: 'line' as const,
          smooth: true,
          areaStyle: {
            color: 'rgba(84, 112, 198, 0.2)'
          },
          itemStyle: {
            borderRadius: [4, 4, 0, 0]
          }
        }
      ]
    };

    try {
      this.chart.setOption(this.chartOptions);
      // Ensure chart resizes to fit container
      setTimeout(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      console.log('✅ Chart updated successfully');
    } catch (error) {
      console.error('❌ Failed to set chart options:', error);
    }
  }
}
