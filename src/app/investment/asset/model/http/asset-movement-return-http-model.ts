import { AssetHttpModel } from "./asset-http-model";
import { AssetMovementHttp } from "./asset-movement-http-model";
import { MovementHttp } from "./movement-http";

export class AssetMovementReturnHttp extends MovementHttp {
  operation!: string;
  amount!: number;
  unitValue!: number;
  exDividendDate!: Date;
  asset?: AssetHttpModel;
}
