import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../commons/service/base-crud.service';
import { InstallmentModel } from '../model/installment-model';

@Injectable({
  providedIn: 'root'
})
export class InstallmentService extends BaseCrudService<InstallmentModel> {
  constructor(protected override readonly httpClient: HttpClient) {
    super(httpClient);
  }
}
