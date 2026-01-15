import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../commons/service/base-crud.service';
import { VehiclePartModel } from '../vehicle-part/model/vehicle-part-model';

@Injectable()
export class VehiclePartService extends BaseCrudService<VehiclePartModel> {
}
