import { AssetModel } from "../../model/asset-model";
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

  override toHttp(assetModel: AssetModel): AssetHttpModel {
    throw new Error("Method not implemented.");
  }
}
