import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../commons/service/base-crud.service';
import { VehicleFuelModel } from '../vehicle-fuel/model/vehicle-fuel';

@Injectable()
export class VehicleFuelService extends BaseCrudService<VehicleFuelModel> {
}
