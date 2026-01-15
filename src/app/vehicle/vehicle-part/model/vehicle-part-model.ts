import { GenericT } from "../../../commons/model/generic-t";
import { VehicleModel } from "../../model/vehicle-model";

export class VehiclePartModel extends GenericT{
    isUpgrade: boolean;
    description: string;
    partNumber: string; 
    value: number;
    shop: string;
    vehicle: VehicleModel;

    constructor(
    ) {
        super();
        this.isUpgrade = false;
        this.description = '';
        this.partNumber = '';
        this.value = 0.0;
        this.shop = '';
        this.vehicle = new VehicleModel();
    }
}
