import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../commons/service/base-crud.service';
import { StatementModel } from '../model/statement-model';

@Injectable({
  providedIn: 'root'
})
export class StatementService extends BaseCrudService<StatementModel> {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = this.baseUrl.concat("/cards/1/statements");
  }
}
