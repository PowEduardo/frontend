import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseCrudService } from '../../commons/service/base-crud.service';
import { VehicleModel } from '../model/vehicle-model';

@Injectable()
export class VehicleService extends BaseCrudService<VehicleModel> {

  constructor() {
    super();
    this.baseUrl = environment.apiBaseUrl + "/vehicles";
  }
}
