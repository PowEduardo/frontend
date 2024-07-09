import { AssetMovimentModel } from "../../model/asset-moviment-model";
import { MovimentAssetHttpModel } from "../../model/http/moviment-asset-http-model";
import { MovimentMapper } from "../moviment-mapper";

export class AssetMovimentMapperImpl extends MovimentMapper<AssetMovimentModel, MovimentAssetHttpModel> {

  override toModel(response: MovimentAssetHttpModel): AssetMovimentModel {
    const model: AssetMovimentModel = new AssetMovimentModel();
    model.id = response.id;
    model.amount = response.amount;
    model.date = response.date;
    model.operation = response.operation;
    model.type = "ASSET_MOVIMENT";
    model.value = response.value;
    model.unitValue = response.unitValue;
    return model;
  }
  override toHttp(model: AssetMovimentModel): MovimentAssetHttpModel {
    const request: MovimentAssetHttpModel = new MovimentAssetHttpModel();
    request.id = model.id;
    request.amount = model.amount;
    request.date = model.date;
    request.operation = model.operation;
    request.type = "ASSET_MOVIMENT";
    request.value = model.value;
    request.unitValue = model.unitValue;
    return request;
  }

}
