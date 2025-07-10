import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../commons/service/base-crud.service';
import { VehicleFuelModel } from '../vehicle-fuel/model/vehicle-fuel';

@Injectable()
export class VehicleFuelService extends BaseCrudService<VehicleFuelModel> {

  constructor(override readonly httpClient: HttpClient) {
      super(httpClient);
    }
}
