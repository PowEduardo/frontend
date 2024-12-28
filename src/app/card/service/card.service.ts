import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../commons/base/model/page';
import { PageQuery } from '../../commons/base/model/page-query';
import { CardDetailsModel } from '../model/account-details-model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl: string = "http://localhost:8080/";
      cardId: number = 1;
  
      constructor(private readonly httpClient: HttpClient) {
          this.baseUrl = this.baseUrl.concat("cards/{cardId}/details");
      }
      create(request: CardDetailsModel): Observable<CardDetailsModel> {
          throw new Error("Method not implemented.");
      }
      read(id: number): Observable<CardDetailsModel> {
          throw new Error("Method not implemented.");
      }
      readAll(pageQuery: PageQuery): Observable<CardDetailsModel[]> {
          throw new Error("Method not implemented.");
      }
      update(request: CardDetailsModel, id: number): Observable<CardDetailsModel> {
          throw new Error("Method not implemented.");
      }
      delete(id: number): Observable<void> {
          throw new Error("Method not implemented.");
      }
      search(query: PageQuery): Observable<Page<CardDetailsModel>> {
          throw new Error("Method not implemented.");
      }
      details(): Observable<CardDetailsModel> {
          return this.httpClient.get<CardDetailsModel>(this.baseUrl.replace("{cardId}", this.cardId.toString()));
      }
}
