import { MovementType } from "../../../../commons/base/movement/enum/movement-type";
import { MovementMapper } from "../../../../commons/base/movement/mapper/movement-mapper";
import { AssetMovementModel } from "../../model/asset-movement-model";
import { AssetMovementHttp } from "../../model/http/asset-movement-http-model";

export class AssetMovementMapperImpl extends MovementMapper<AssetMovementModel, AssetMovementHttp> {

  override toModel(http: AssetMovementHttp): AssetMovementModel {
    const model: AssetMovementModel = new AssetMovementModel();
    model.id = http.id;
    model.amount = http.amount!;
    model.date = http.date;
    model.operation = http.operation!;
    model.type = http.type;
    model.value = http.value;
    model.unitValue = http.unitValue!;
    model.asset = http.asset!.ticker;
    model.description = http.description;
    model.liquidationFee = http.liquidationFee;
    return model;
  }
  override toHttp(model: AssetMovementModel): AssetMovementHttp {
    const http: AssetMovementHttp = new AssetMovementHttp();
    http.category = "INVESTMENT"
    http.id = model.id;
    http.amount = model.amount;
    http.date = model.date;
    http.operation = model.operation;
    http.type = MovementType.DEBIT;
    http.value = model.value;
    http.unitValue = model.unitValue;
    http.description = model.description;
    http.liquidationFee = model.liquidationFee;
    return http;
  }

}
