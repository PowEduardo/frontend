import { InvestmentMovementModel } from "./movement-model";

export class AssetMovementReturnModel extends InvestmentMovementModel {
  operation!: string;
  amount!: number;
  unitValue!: number;
  exDividendDate!: Date;
  asset!: string;
  irFee!: number;
}
