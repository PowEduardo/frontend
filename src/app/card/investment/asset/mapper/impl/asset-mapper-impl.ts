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

  override toModelWithDetails(assetHttp: AssetDetailsHttpModel, model: AssetModel): AssetModel {
    model.ady = assetHttp.ady;
    model.amount = assetHttp.amount;
    model.average = assetHttp.average;
    model.currentValue = assetHttp.currentValue;
    model.difference = assetHttp.difference;
    model.dy = assetHttp.dy;
    model.lastReturn = assetHttp.lastReturn;
    model.monthlyReturn = assetHttp.monthlyReturn;
    model.paidValue = assetHttp.paidValue;
    model.returns = assetHttp.returns;
    model.targetAmount = assetHttp.targetAmount;
    return model;
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
