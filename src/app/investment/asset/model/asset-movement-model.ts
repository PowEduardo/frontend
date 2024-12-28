import { InvestmentMovementModel } from "./movement-model";

export class AssetMovementModel extends InvestmentMovementModel {
  amount!: number;
  operation!: string;
  unitValue!: number;
  dueDate!: Date;
  asset!: string;
  liquidationFee!: number;
}
