import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ExternalTransactionDTO } from '../model/external-transaction.model';
import { StatementValidationResultDTO } from '../model/statement-validation-result.model';

@Injectable({
  providedIn: 'root'
})
export class StatementValidationService {
  private httpClient = inject(HttpClient);

  /**
   * Upload and parse CSV file
   */
  uploadCsv(cardId: number, statementId: number, file: File): Observable<ExternalTransactionDTO[]> {
    const formData = new FormData();
    formData.append('file', file);
    
    const url = `${environment.apiBaseUrl}/cards/${cardId}/statements/${statementId}/upload-csv`;
    return this.httpClient.post<ExternalTransactionDTO[]>(url, formData);
  }

  /**
   * Validate statement against external transactions
   */
  validate(
    cardId: number,
    statementId: number,
    externalData: { externalTransactions: ExternalTransactionDTO[]; externalTotal: number }
  ): Observable<StatementValidationResultDTO> {
    const url = `${environment.apiBaseUrl}/cards/${cardId}/statements/${statementId}/validate`;
    return this.httpClient.post<StatementValidationResultDTO>(url, externalData);
  }

  /**
   * Update installment value
   */
  updateInstallment(
    cardId: number,
    statementId: number,
    installmentId: number,
    value: number
  ): Observable<any> {
    const url = `${environment.apiBaseUrl}/cards/${cardId}/statements/${statementId}/installments/${installmentId}`;
    return this.httpClient.put<any>(url, { value });
  }

  /**
   * Delete installment
   */
  deleteInstallment(
    cardId: number,
    statementId: number,
    installmentId: number
  ): Observable<void> {
    const url = `${environment.apiBaseUrl}/cards/${cardId}/statements/${statementId}/installments/${installmentId}`;
    return this.httpClient.delete<void>(url);
  }

  /**
   * Create installment
   */
  createInstallment(
    cardId: number,
    statementId: number,
    installmentData: any
  ): Observable<any> {
    const url = `${environment.apiBaseUrl}/cards/${cardId}/statements/${statementId}/installments`;
    return this.httpClient.post<any>(url, installmentData);
  }
}
