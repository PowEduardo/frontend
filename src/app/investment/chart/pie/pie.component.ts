
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { PieChartModel } from '../../model/pie-chart-model';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  template: `
    <div class="pie-chart-container">
      <div #chartElement
        [style.width.%]="100"
        [style.height.px]="400">
      </div>
    </div>
  `,
  styles: [`
    .pie-chart-container {
      width: 100%;
      height: 100%;
    }
  `]
})
export class PieComponent implements OnChanges, AfterViewInit {
  @ViewChild('chartElement', { static: false }) chartElement!: ElementRef;
  
  @Input()
  public pieChartData!: PieChartModel[];

  chartOptions: EChartsOption = {};
  private chart: echarts.ECharts | null = null;

  ngAfterViewInit(): void {
    this.initChart();
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pieChartData']) {
      this.calculatePercentages();
      this.updateChart();
    }
  }

  /**
   * Initialize the ECharts instance
   */
  private initChart(): void {
    if (this.chartElement && !this.chart) {
      this.chart = echarts.init(this.chartElement.nativeElement);
    }
  }

  calculatePercentages() {
    const total = this.pieChartData.reduce((sum, item) => sum + item.value, 0);
    this.pieChartData = this.pieChartData.map(item => {
      const percentage = ((item.value / total) * 100).toFixed(2);
      return { ...item, name: `${item.name} (${percentage}%)` };
    });
  }

  private updateChart(): void {
    const data = this.pieChartData.map(item => ({
      name: item.name,
      value: item.value
    }));

    this.chartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        bottom: 10,
        left: 'center'
      },
      series: [
        {
          name: 'Investimentos',
          type: 'pie' as const,
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    if (this.chart) {
      this.chart.setOption(this.chartOptions);
    }
  }
}
