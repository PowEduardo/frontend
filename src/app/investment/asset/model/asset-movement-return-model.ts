import { MovementModel } from "./movement-model";

export class AssetMovementReturnModel extends MovementModel {
  operation!: string;
  amount!: number;
  unitValue!: number;
  exDividendDate!: Date;
}
