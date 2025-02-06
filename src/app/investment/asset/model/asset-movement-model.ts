import { MovementModel } from "../../../commons/base/movement/model/movement-model";
import { AssetModel } from "./asset-model";

export class AssetMovementModel extends MovementModel {
  amount!: number;
  operation!: string;
  unitValue!: number;
  dueDate!: Date;
  asset!: AssetModel;
  liquidationFee!: number;
}
