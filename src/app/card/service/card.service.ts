import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseCrudService } from '../../commons/service/base-crud.service';
import { CardDetailsModel } from '../model/card-details-model';
import { CardModel } from '../model/card-model';

/**
 * Service for Credit Card API operations.
 * Extends BaseCrudService for standardized CRUD operations.
 * Provides additional custom methods for card-specific operations.
 */
@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseCrudService<CardModel> {

  constructor() {
    super();
    this.baseUrl = environment.apiBaseUrl + '/api/v1/cards';
  }

  /**
   * GET /api/v1/cards/{id}/details
   * Get detailed card info with statements and movements.
   * Custom method specific to Card operations.
   */
  getDetails(id: number): Observable<CardDetailsModel> {
    return this.httpClient.get<CardDetailsModel>(`${this.baseUrl}/${id}/details`);
  }
}
