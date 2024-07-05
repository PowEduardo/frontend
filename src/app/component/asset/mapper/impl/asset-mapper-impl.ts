import { AssetModel } from "../../model/asset-model";
import { AssetDetailsHttpModel } from "../../model/http/asset-details-http-model";
import { AssetHttpModel } from "../../model/http/asset-http-model";
import { AssetMapper } from "../asset-mapper";

export class AssetMapperImpl extends AssetMapper {
  override toModel(response: AssetHttpModel): AssetModel {
    var model: AssetModel = new AssetModel();
    model.id = response.id;
    model.ticker = response.ticker;
    model.value = response.value;
    model.type = response.type;
    return model;
  }

  override toModelWithDetails(assetHttp: AssetDetailsHttpModel, assetModel: AssetModel): AssetModel {
    assetModel.amount = assetHttp.amount;
    assetModel.returns = assetHttp.returns;
    return assetModel;
  }

  override toHttp(model: AssetModel): AssetHttpModel {
    var request: AssetHttpModel = new AssetHttpModel();
    request.id = model.id;
    request.ticker = model.ticker;
    request.value = model.value;
    request.type = model.type;
    return request;
  }
}
