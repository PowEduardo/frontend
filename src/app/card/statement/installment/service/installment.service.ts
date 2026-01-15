import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../commons/service/base-crud.service';
import { InstallmentModel } from '../model/installment-model';

@Injectable({
  providedIn: 'root'
})
export class InstallmentService extends BaseCrudService<InstallmentModel> {
}
