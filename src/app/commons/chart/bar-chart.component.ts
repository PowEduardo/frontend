import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

/**
 * Generic Bar Chart Component
 * Displays data as a bar chart using Apache ECharts
 * Reusable across all modules with customizable data and options
 */
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bar-chart-container">
      @if (loading) {
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Carregando gráfico...</span>
        </div>
      } @else if (data && data.length > 0) {
        <div class="bar-chart-wrapper">
          <h5>{{ title }}</h5>
          <div #chartElement 
            [style.width.%]="100"
            [style.height.px]="500">
          </div>
        </div>
      } @else {
        <div class="alert alert-info">{{ emptyMessage }}</div>
      }
    </div>
  `,
  styles: [`
    .bar-chart-container {
      margin: 20px 0;
    }
    
    .bar-chart-wrapper {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .bar-chart-wrapper h5 {
      margin-bottom: 20px;
      color: #333;
      font-weight: 600;
    }
  `]
})
export class BarChartComponent implements OnInit, OnChanges, AfterViewInit {
  
  @ViewChild('chartElement', { static: false }) chartElement!: ElementRef;
  
  /** Chart data array */
  @Input() data: any[] = [];
  
  /** Chart title */
  @Input() title: string = 'Bar Chart';
  
  /** Color scheme for chart */
  @Input() colorScheme: string = 'nightLights';
  
  /** Show legend */
  @Input() showLegend: boolean = true;
  
  /** X Axis Label */
  @Input() xAxisLabel: string = 'Período';
  
  /** Y Axis Label */
  @Input() yAxisLabel: string = 'Valor (R$)';
  
  /** Loading state */
  @Input() loading: boolean = false;
  
  /** Empty message */
  @Input() emptyMessage: string = 'Nenhum dado disponível';

  /** Chart options for ECharts */
  chartOptions: EChartsOption = {};
  private chart: echarts.ECharts | null = null;

  ngOnInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.updateChart();
    }
  }

  ngAfterViewInit(): void {
    this.initChart();
    this.updateChart();
  }

  /**
   * Initialize the ECharts instance
   */
  private initChart(): void {
    if (this.chartElement && !this.chart) {
      this.chart = echarts.init(this.chartElement.nativeElement);
    }
  }

  /**
   * Update chart options based on data
   */
  private updateChart(): void {
    if (!this.data || this.data.length === 0) {
      return;
    }

    // Extract months and series data
    const months: string[] = [];
    const seriesMap = new Map<string, number[]>();

    this.data.forEach((item) => {
      months.push(item.name);
      
      (item.series || []).forEach((seriesItem: any) => {
        if (!seriesMap.has(seriesItem.name)) {
          seriesMap.set(seriesItem.name, []);
        }
        const seriesValues = seriesMap.get(seriesItem.name)!;
        seriesValues.push(seriesItem.value);
      });
    });

    // Build series array
    const series = Array.from(seriesMap.entries()).map(([name, values]) => ({
      name: name,
      data: values,
      type: 'bar' as const,
      itemStyle: {
        borderRadius: [4, 4, 0, 0]
      }
    }));

    this.chartOptions = {
      color: ['#5470c6', '#ee6666', '#91cc75', '#fac858', '#73c0de'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params: any) => {
          if (Array.isArray(params)) {
            let html = `<div style="padding: 8px;">${params[0]?.axisValue || ''}</div>`;
            params.forEach((param: any) => {
              if (param.value !== undefined) {
                html += `<div style="color: ${param.color}; padding: 4px 8px;">
                  ${param.seriesName}: R$ ${Number(param.value).toFixed(2)}
                </div>`;
              }
            });
            return html;
          }
          return '';
        }
      },
      legend: {
        data: Array.from(seriesMap.keys()),
        show: this.showLegend,
        bottom: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
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
        name: this.yAxisLabel,
        nameTextStyle: {
          fontSize: 12
        },
        axisLabel: {
          formatter: (value: number) => `R$ ${value.toFixed(0)}`
        }
      },
      series: series as any
    };

    if (this.chart) {
      this.chart.setOption(this.chartOptions);
    }
  }
}
