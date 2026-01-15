import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


export interface DashboardDetailsData {
  referenceMonth?: string;
  value?: number;
  paid?: boolean;
}

/**
 * Dashboard DTO for chart and aggregated data
 */
export interface DashboardData {
  totalPaid?: number;
  totalUnpaid?: number;
  balance?: number;
  creditLimit?: number;
  availableCredit?: number;
  details?: DashboardDetailsData[];
}

/**
 * Service for dashboard and chart data
 * Provides aggregated financial information for visualization
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiBaseUrl}/api/v1/dashboard`;

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get total paid amount across all credit cards
   * Used for: Total paid value in chart
   */
  getTotalPaidAmountAllCards(): Observable<DashboardData> {
    return this.httpClient.get<DashboardData>(`${this.apiUrl}/cards/paid-amount`);
  }

  /**
   * Get paid amount and other info for a specific card
   * Used for: Card-specific paid value in chart and card metrics
   */
  getCardPaidAmount(cardId: number): Observable<DashboardData> {
    return this.httpClient.get<DashboardData>(`${this.apiUrl}/cards/${cardId}/paid-amount`);
  }
}
