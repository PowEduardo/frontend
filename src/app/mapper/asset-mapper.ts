import { AssetModel } from "../model/asset-model";
import { AssetHttpModel } from "../model/http/asset-http-model";

export abstract class AssetMapper {
  abstract toModel(assetHttp: AssetHttpModel): AssetModel;
  abstract toHttp(assetModel: AssetModel): AssetHttpModel;
}
