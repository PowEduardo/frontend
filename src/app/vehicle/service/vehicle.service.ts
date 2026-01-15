import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../commons/service/base-crud.service';
import { VehicleModel } from '../model/vehicle-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class VehicleService extends BaseCrudService<VehicleModel> {

  constructor(override readonly httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = environment.apiBaseUrl + "/vehicles";
  }
}
