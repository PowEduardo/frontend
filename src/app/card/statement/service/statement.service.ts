import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../commons/service/base-crud.service';
import { StatementModel } from '../model/statement-model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatementService extends BaseCrudService<StatementModel> {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * Mark a statement as paid
   */
  markAsPaid(cardId: number, statementId: number): Observable<StatementModel> {
    const url = `${environment.apiBaseUrl}/cards/${cardId}/statements/${statementId}/mark-as-paid`;
    return this.httpClient.post<StatementModel>(url, {});
  }

  /**
   * Close a statement
   */
  close(cardId: number, statementId: number): Observable<StatementModel> {
    const url = `${environment.apiBaseUrl}/cards/${cardId}/statements/${statementId}/close`;
    return this.httpClient.post<StatementModel>(url, {});
  }
}
