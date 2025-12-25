import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCrudService } from '../../commons/service/base-crud.service';
import { CardModel } from '../model/card-model';
import { environment } from '../../../environments/environment';

/**
 * Service for Credit Card API operations.
 * Extends BaseCrudService for standardized CRUD operations.
 * Provides additional custom methods for card-specific operations.
 */
@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseCrudService<CardModel> {

  constructor(override readonly httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = environment.apiBaseUrl + '/api/v1/cards';
  }

  /**
   * GET /api/v1/cards/{id}/details
   * Get detailed card info with statements and movements.
   * Custom method specific to Card operations.
   */
  getDetails(id: number): Observable<CardModel> {
    return this.httpClient.get<CardModel>(`${this.baseUrl}/${id}/details`);
  }
}
