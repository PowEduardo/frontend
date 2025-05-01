import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../commons/service/base-crud.service';
import { VehicleModel } from '../model/vehicle-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseCrudService<VehicleModel>{

  constructor(override readonly httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = "http://localhost:8080/vehicles";
  }
}
