import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseCrudService } from '../../../commons/service/base-crud.service';
import { StatementModel } from '../model/statement-model';

@Injectable({
  providedIn: 'root'
})
export class StatementService extends BaseCrudService<StatementModel> {
  private http = inject(HttpClient);
  private cardId: number = 1; // Default, should be set from context

  /**
   * Read statement by ID - override parent to use correct endpoint
   */
  override read(id: number | null): Observable<StatementModel> {
    if (id === null) {
      return this.http.get<StatementModel>(`${environment.apiBaseUrl}/cards/${this.cardId}/statements`);
    }
    return this.http.get<StatementModel>(`${environment.apiBaseUrl}/cards/${this.cardId}/statements/${id}`);
  }

  /**
   * Set card ID for API calls
   */
  setCardId(cardId: number): void {
    this.cardId = cardId;
  }

  /**
   * Mark a statement as paid
   */
  markAsPaid(cardId: number, statementId: number): Observable<StatementModel> {
    const url = `${environment.apiBaseUrl}/cards/${cardId}/statements/${statementId}/mark-as-paid`;
    return this.http.post<StatementModel>(url, {});
  }

  /**
   * Close a statement
   */
  close(cardId: number, statementId: number): Observable<StatementModel> {
    const url = `${environment.apiBaseUrl}/cards/${cardId}/statements/${statementId}/close`;
    return this.httpClient.post<StatementModel>(url, {});
  }
}
