import { MovementModel } from "../../../commons/base/movement/model/movement-model";

export class AssetMovementModel extends MovementModel {
  amount!: number;
  operation!: string;
  unitValue!: number;
  dueDate!: Date;
  asset!: string;
  liquidationFee!: number;
}
