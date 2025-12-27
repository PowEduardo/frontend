import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../commons/service/notification.service';
import { BarChartComponent } from '../../commons/chart/bar-chart.component';
import { environment } from '../../../environments/environment';

/**
 * Account Dashboard Component
 * Displays a summary dashboard with charts showing movement data by period
 * Uses generic BarChartComponent for chart visualization
 * Calls backend endpoint to get aggregated monthly data
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, BarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  /** Parent account ID */
  @Input() parentId: number | null = null;

  /** Loading state */
  loading: boolean = true;

  /** Chart data for bar chart */
  chartData: any[] = [];

  /** Summary statistics */
  totalMovements: number = 0;
  totalIncome: number = 0;
  totalExpense: number = 0;
  balance: number = 0;
  paidMovements: number = 0;
  unpaidMovements: number = 0;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract accountId from parent route if not passed via @Input
    if (!this.parentId) {
      this.route.parent?.paramMap.subscribe(params => {
        const idParam = params.get('accountId');
        if (idParam) {
          this.parentId = parseInt(idParam, 10);
          this.loadDashboardData();
        }
      });
    } else {
      this.loadDashboardData();
    }
  }

  /**
   * Load dashboard data from backend
   * Calls endpoint that returns aggregated monthly data
   */
  private loadDashboardData(): void {
    this.loading = true;

    if (!this.parentId) {
      this.loading = false;
      return;
    }

    const url = `${environment.apiBaseUrl}/api/v1/dashboard/accounts/${this.parentId}?startRange=2025-01&endRange=2025-12`;
    
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.processChartData(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.notificationService.error(`Erro ao carregar dados do dashboard: ${error.message}`);
        this.loading = false;
      }
    });
  }

  /**
   * Process dashboard data from backend
   * Transforms the response into chart data
   * @param data Dashboard data from API
   */
  private processChartData(data: any): void {
    // Calculate statistics
    this.totalIncome = data.accountDetails.totalIncome || 0;
    this.totalExpense = data.accountDetails.totalExpense || 0;
    this.balance = data.accountDetails.balance || 0;
    
    // Count paid/unpaid from details
    this.paidMovements = data.accountDetails.totalPaid || 0;
    this.unpaidMovements = data.accountDetails.totalUnpaid || 0;
    this.totalMovements = this.paidMovements + this.unpaidMovements;
    
    // Build chart data from details (grouped by month)
    const dataByMonth = new Map<string, { income: number; expense: number }>();

    (data.barChartDetails || []).forEach((detail: any) => {
      const monthStr = detail.reference || new Date().toISOString().slice(0, 7);
      if (!dataByMonth.has(monthStr)) {
        dataByMonth.set(monthStr, { income: 0, expense: 0 });
      }
      const monthData = dataByMonth.get(monthStr)!;
      monthData.income += detail.firstValue || 0;
      monthData.expense += detail.secondValue || 0;
      
    });

    // Sort months
    const months = Array.from(dataByMonth.keys()).sort();
    
    // Format data for ngx-charts-bar - group by month, each month has income/expense
    this.chartData = months.map(month => {
      const monthData = dataByMonth.get(month)!;
      return {
        name: month,
        // value: monthData.income + monthData.expense,
        series: [
          {
            name: 'Receitas',
            value: Number(monthData.income)
          },
          {
            name: 'Despesas',
            value: Number(monthData.expense)
          }
        ]
      };
    });
    console.log('Chart Data:', this.chartData);
  }
}
