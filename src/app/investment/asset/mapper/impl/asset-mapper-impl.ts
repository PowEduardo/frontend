import { AssetModel } from "../../model/asset-model";
import { AssetDetailsHttpModel } from "../../model/http/asset-details-http-model";
import { AssetHttpModel } from "../../model/http/asset-http-model";
import { AssetMapper } from "../asset-mapper";

export class AssetMapperImpl extends AssetMapper {
  override toModel(response: AssetHttpModel): AssetModel {
    const model: AssetModel = new AssetModel();
    model.id = response.id;
    model.ticker = response.ticker;
    model.value = response.value;
    model.type = response.type;
    model.indexer = response.indexer;
    model.interestRate = response.interestRate;
    return model;
  }

  override toModelWithDetails(response: AssetDetailsHttpModel, model: AssetModel): AssetModel {
    model.ady = response.ady;
    model.amount = response.amount;
    model.average = response.average;
    model.currentValue = response.currentValue;
    model.difference = response.difference;
    model.dy = response.dy;
    model.lastReturn = response.lastReturn;
    model.monthlyReturn = response.monthlyReturn;
    model.paidValue = response.paidValue;
    model.returns = response.returns;
    model.targetAmount = response.targetAmount;
    return model;
  }

  override toHttp(model: AssetModel): AssetHttpModel {
    const request: AssetHttpModel = new AssetHttpModel();
    request.id = model.id;
    request.ticker = model.ticker;
    request.value = model.value;
    request.type = model.type;
    return request;
  }
}
