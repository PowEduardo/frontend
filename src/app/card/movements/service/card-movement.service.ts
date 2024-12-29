import { Injectable } from '@angular/core';
import { MovementService } from '../../../commons/base/movement/service/movement.service';
import { CardMovementModel } from '../model/card-movement-model';
import { Observable } from 'rxjs';
import { Page } from '../../../commons/base/model/page';
import { PageQuery } from '../../../commons/base/model/page-query';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardMovementService extends MovementService<CardMovementModel> {

  constructor(private readonly httpClient: HttpClient) {
    super();
    this.baseUrl = this.baseUrl.concat("cards/{parentId}/movements");
  }

  create(request: CardMovementModel): Observable<CardMovementModel> {
    return this.httpClient.post<CardMovementModel>(this.baseUrl.replace("{parentId}", this.parentId.toString()), request);
  }
  read(id: number): Observable<CardMovementModel> {
    throw new Error('Method not implemented.');
  }
  readAll(pageQuery: PageQuery): Observable<CardMovementModel[]> {
    throw new Error('Method not implemented.');
  }
  update(request: CardMovementModel): Observable<CardMovementModel> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
  search(query: PageQuery): Observable<Page<CardMovementModel>> {
    throw new Error('Method not implemented.');
  }
}
