import { AssetHttpModel } from "./asset-http-model";
import { AssetMovementHttp } from "./asset-movement-http-model";
import { InvestmentMovementHttp } from "./movement-http";

export class AssetMovementReturnHttp extends InvestmentMovementHttp {
  operation!: string;
  amount!: number;
  unitValue!: number;
  exDividendDate!: Date;
  asset?: AssetHttpModel;
}
