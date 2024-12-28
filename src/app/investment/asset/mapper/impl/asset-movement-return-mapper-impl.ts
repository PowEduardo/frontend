import { MovementMapper } from "../../../../commons/base/movement/mapper/movement-mapper";
import { AssetMovementReturnModel } from "../../model/asset-movement-return-model";
import { AssetMovementReturnHttp } from "../../model/http/asset-movement-return-http-model";

export class AssetMovementReturnMapperImpl extends MovementMapper<AssetMovementReturnModel, AssetMovementReturnHttp> {
  override toModel(http: AssetMovementReturnHttp): AssetMovementReturnModel {
    const model: AssetMovementReturnModel = new AssetMovementReturnModel();
    model.amount = http.amount;
    model.date = http.date;
    model.exDividendDate = http.exDividendDate;
    model.operation = http.operation;
    model.unitValue = http.unitValue;
    model.value = http.value;
    model.id = http.id;
    model.asset = http.asset!.ticker;
    model.irFee = http.irFee;
    return model;
  }
  override toHttp(model: AssetMovementReturnModel): AssetMovementReturnHttp {
    const http: AssetMovementReturnHttp = new AssetMovementReturnHttp();
    http.category = "INVESTMENT"
    http.amount = model.amount;
    http.date = model.date;
    http.exDividendDate = model.exDividendDate;
    http.operation = model.operation;
    http.unitValue = model.unitValue;
    http.value = model.value;
    http.id = model.id;
    http.type = "CREDIT";
    http.irFee = model.irFee;
    return http;
  }
}
