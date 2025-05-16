import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../commons/service/base-crud.service';
import { VehiclePartModel } from '../vehicle-part/model/vehicle-part-model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VehiclePartService extends BaseCrudService<VehiclePartModel> {
  
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = "http://localhost:8080/vehicles/{parentId}/parts";
  }
}
