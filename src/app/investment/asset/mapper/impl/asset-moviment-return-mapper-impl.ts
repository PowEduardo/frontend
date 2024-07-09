import { MovementMapper } from "../../../../commons/base/movement/mapper/movement-mapper";
import { AssetMovementReturnModel } from "../../model/asset-movement-return-model";
import { AssetMovementReturnHttp } from "../../model/http/asset-movement-return-http-model";

export class AssetMovimentReturnMapperImpl extends MovementMapper<AssetMovementReturnModel, AssetMovementReturnHttp> {
  override toModel(returnHttp: AssetMovementReturnHttp): AssetMovementReturnModel {
    const returnModel: AssetMovementReturnModel = new AssetMovementReturnModel();
    returnModel.amount = returnHttp.amount;
    returnModel.date = returnHttp.date;
    returnModel.exDividendDate = returnHttp.exDividendDate;
    returnModel.operation = returnHttp.operation;
    returnModel.unitValue = returnHttp.unitValue;
    returnModel.value = returnHttp.value;
    returnModel.id = returnHttp.id;
    return returnModel;
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
