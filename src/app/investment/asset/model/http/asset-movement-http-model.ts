import { AssetHttpModel } from "./asset-http-model";
import { InvestmentMovementHttp } from "./movement-http";

export class AssetMovementHttp extends InvestmentMovementHttp {
  operation?: string;
  amount?: number;
  unitValue?: number;
  dueDate?: Date;
  asset?: AssetHttpModel;
  liquidationFee!: number;
}
