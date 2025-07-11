import { GenericT } from "../../../commons/model/generic-t";

export class VehicleFuelModel extends GenericT {
    date: Date | null;
    description: string | null;
    milage: number | null;
    liters: number | null;
    price: number | null;
    value: number | null;
    type: string | null;
    consumption: number | null;

    constructor() {
        super();
        this.id = null;
        this.date = null;
        this.description = null;
        this.milage = null;
        this.liters = null;
        this.price = null;
        this.value = null;
        this.type = null;
        this.consumption = null;
    }
}
