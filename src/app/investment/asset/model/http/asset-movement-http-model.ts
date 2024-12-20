import { AssetHttpModel } from "./asset-http-model";
import { MovementHttp } from "./movement-http";

export class AssetMovementHttp extends MovementHttp {
  operation?: string;
  amount?: number;
  unitValue?: number;
  dueDate?: Date;
  asset?: AssetHttpModel;
}
