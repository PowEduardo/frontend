import { Component, Input, OnInit } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [NgxChartsModule],
  providers: [],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css'
})
export class PieComponent implements OnInit {
  @Input()
  public pieChartData: any[] = [];

  public view: [number, number] = [600, 300];

  public showLegend: boolean = true;
  public showLabels: boolean = true;
  public isDoughnut: boolean = false;

  public legendPosition: LegendPosition = LegendPosition.Right;

  ngOnInit() {
    this.calculatePercentages();
  }

  calculatePercentages() {
    const total = this.pieChartData.reduce((sum, item) => sum + item.value, 0);
    this.pieChartData = this.pieChartData.map(item => {
      const percentage = ((item.value / total) * 100).toFixed(2);
      return { ...item, name: `${item.name} (${percentage}%)` };
    });
  }
}
