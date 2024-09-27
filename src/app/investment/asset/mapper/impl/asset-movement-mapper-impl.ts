import { MovementType } from "../../../../commons/base/movement/enum/movement-type";
import { MovementMapper } from "../../../../commons/base/movement/mapper/movement-mapper";
import { AssetMovementModel } from "../../model/asset-movement-model";
import { AssetMovementHttp } from "../../model/http/asset-movement-http-model";

export class AssetMovementMapperImpl extends MovementMapper<AssetMovementModel, AssetMovementHttp> {

  override toModel(response: AssetMovementHttp): AssetMovementModel {
    const model: AssetMovementModel = new AssetMovementModel();
    model.id = response.id;
    model.amount = response.amount!;
    model.date = response.date;
    model.operation = response.operation!;
    model.type = response.type;
    model.value = response.value;
    model.unitValue = response.unitValue!;
    model.asset = response.asset!.ticker;
    return model;
  }
  override toHttp(model: AssetMovementModel): AssetMovementHttp {
    const request: AssetMovementHttp = new AssetMovementHttp();
    request.id = model.id;
    request.amount = model.amount;
    request.date = model.date;
    request.operation = model.operation;
    request.type = MovementType.ASSET_MOVEMENT;
    request.value = model.value;
    request.unitValue = model.unitValue;
    return request;
  }

}
