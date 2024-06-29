import { AssetModel } from "../../model/asset-model";
import { AssetDetailsHttpModel } from "../../model/http/asset-details-http-model";
import { AssetHttpModel } from "../../model/http/asset-http-model";
import { AssetMapper } from "../asset-mapper";

export class AssetMapperImpl extends AssetMapper {
  override toModel(assetHttp: AssetHttpModel): AssetModel {
    var assetModel: AssetModel = new AssetModel();
    assetModel.id = assetHttp.id;
    assetModel.ticker = assetHttp.ticker;
    assetModel.value = assetHttp.value;
    return assetModel;
  }

  override toModelWithDetails(assetHttp: AssetDetailsHttpModel, assetModel: AssetModel): AssetModel {
    assetModel.amount = assetHttp.amount;
    assetModel.returns = assetHttp.returns;
    return assetModel;
  }

  override toHttp(assetModel: AssetModel): AssetHttpModel {
    throw new Error("Method not implemented.");
  }
}
