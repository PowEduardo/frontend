import { GenericT } from "../../commons/model/generic-t";

export class VehicleModel extends GenericT {
    manufacturer: string | null = null;
    model: string | null = null;
    year: number | null = null;
    milage: number | null = null;
    version: string | null = null;
    value: number | null = null;
}
