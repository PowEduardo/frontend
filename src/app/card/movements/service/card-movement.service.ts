import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../commons/base/model/page';
import { PageQuery } from '../../../commons/base/model/page-query';
import { MovementService } from '../../../commons/base/movement/service/movement.service';
import { CardMovementModel } from '../model/card-movement-model';

/**
 * Service for Card Movement operations.
 * Handles CRUD and custom operations for card movements.
 */
@Injectable({
  providedIn: 'root'
})
export class CardMovementService extends MovementService<CardMovementModel> {
  private readonly httpClient = inject(HttpClient);


  constructor() {
    super();
    this.baseUrl = this.baseUrl.concat("/cards/{parentId}/movements");
  }

  create(request: CardMovementModel): Observable<CardMovementModel> {
    return this.httpClient.post<CardMovementModel>(this.baseUrl.replace("{parentId}", this.parentId.toString()), request);
  }
  
  read(id: number): Observable<CardMovementModel> {
    return this.httpClient.get<CardMovementModel>(this.baseUrl.replace("{parentId}", this.parentId.toString()).concat('/').concat(id.toString()));
  }
  
  readAll(pageQuery: PageQuery): Observable<CardMovementModel[]> {
    throw new Error(`Method not implemented. ${pageQuery}`);
  }
  
  update(request: CardMovementModel): Observable<CardMovementModel> {
    return this.httpClient.put<CardMovementModel>(this.baseUrl.replace("{parentId}", this.parentId.toString()) + "/" + request.id, request);
  }

  /**
   * Get unpaid movements for the current card
   * Filters and returns only movements that haven't been paid yet
   */
  getUnpaidMovements(): Observable<Page<CardMovementModel>> {
    const query = new PageQuery();
    query.query = 'paid:false';
    return this.searchMovements(query);
  }

  /**
   * Search movements with custom filters
   */
  searchMovements(pageQuery: PageQuery): Observable<Page<CardMovementModel>> {
    const url = this.baseUrl.replace("{parentId}", this.parentId.toString()) + '/search';
    
    let params = new HttpParams()
      .set('_limit', pageQuery.limit?.toString() || '10')
      .set('_offset', pageQuery.offset?.toString() || '0');
    
    if (pageQuery.sort) {
      params = params.set('_sort', pageQuery.sort);
    }
    
    if (pageQuery.query) {
      params = params.set('_q', pageQuery.query);
    }

    return this.httpClient.get<Page<CardMovementModel>>(url, { params });
  }

  /**
   * Mark a movement as paid
   */
  markAsPaid(movementId: number): Observable<CardMovementModel> {
    const url = this.baseUrl.replace("{parentId}", this.parentId.toString()) + `/${movementId}/mark-as-paid`;
    return this.httpClient.post<CardMovementModel>(url, {});
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl.replace("{parentId}", this.parentId.toString()).concat('/').concat(id.toString()));
  }

  search(query: PageQuery): Observable<Page<CardMovementModel>> {
    throw new Error(`Method not implemented. ${query}`);
  }
}
