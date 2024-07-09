import { AssetModel } from "../model/asset-model";
import { AssetDetailsHttpModel } from "../model/http/asset-details-http-model";
import { AssetHttpModel } from "../model/http/asset-http-model";

export abstract class AssetMapper {
  abstract toModel(assetHttp: AssetHttpModel): AssetModel;
  abstract toModelWithDetails(assetHttp: AssetDetailsHttpModel, assetModel: AssetModel): AssetModel;
  abstract toHttp(assetModel: AssetModel): AssetHttpModel;
}
