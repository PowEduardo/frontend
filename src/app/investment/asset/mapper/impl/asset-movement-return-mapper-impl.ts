import { MovementMapper } from "../../../../commons/base/movement/mapper/movement-mapper";
import { AssetMovementReturnModel } from "../../model/asset-movement-return-model";
import { AssetMovementReturnHttp } from "../../model/http/asset-movement-return-http-model";

export class AssetMovementReturnMapperImpl extends MovementMapper<AssetMovementReturnModel, AssetMovementReturnHttp> {
  override toModel(response: AssetMovementReturnHttp): AssetMovementReturnModel {
    const model: AssetMovementReturnModel = new AssetMovementReturnModel();
    model.amount = response.amount;
    model.date = response.date;
    model.exDividendDate = response.exDividendDate;
    model.operation = response.operation;
    model.unitValue = response.unitValue;
    model.value = response.value;
    model.id = response.id;
    model.asset = response.asset!.ticker;
    return model;
  }
  override toHttp(returnModel: AssetMovementReturnModel): AssetMovementReturnHttp {
    const returnHttp: AssetMovementReturnHttp = new AssetMovementReturnHttp();
    returnHttp.amount = returnModel.amount;
    returnHttp.date = returnModel.date;
    returnHttp.exDividendDate = returnModel.exDividendDate;
    returnHttp.operation = returnModel.operation;
    returnHttp.unitValue = returnModel.unitValue;
    returnHttp.value = returnModel.value;
    returnHttp.id = returnModel.id;
    returnHttp.type = "ASSET_RETURN";
    return returnHttp;
  }
}
