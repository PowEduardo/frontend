import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatementModel } from '../model/statement-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatementService {
  baseUrl: string = "http://localhost:8080/";
  constructor(private readonly httpClient: HttpClient) {
    this.baseUrl = this.baseUrl.concat("cards/1/statements");
  }

  create(request: StatementModel): Observable<StatementModel> {
      return this.httpClient.post<StatementModel>(this.baseUrl, request);
    }
}
