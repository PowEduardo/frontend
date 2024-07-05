import { MovimentAssetReturnHttpModel } from "../../model/http/moviment-asset-return-http-model";
import { AssetMovimentReturnModel } from "../../model/asset-moviment-return-model";
import { MovimentMapper } from "../moviment-mapper";

export class AssetReturnMapperImpl extends MovimentMapper<AssetMovimentReturnModel, MovimentAssetReturnHttpModel> {
  override toModel(returnHttp: MovimentAssetReturnHttpModel): AssetMovimentReturnModel {
    var returnModel: AssetMovimentReturnModel = new AssetMovimentReturnModel();
    returnModel.amount = returnHttp.amount;
    returnModel.date = returnHttp.date;
    returnModel.exDividendDate = returnHttp.exDividendDate;
    returnModel.operation = returnHttp.operation;
    returnModel.unitValue = returnHttp.unitValue;
    returnModel.value = returnHttp.value;
    returnModel.id = returnHttp.id;
    return returnModel;
  }
  override toHttp(returnModel: AssetMovimentReturnModel): MovimentAssetReturnHttpModel {
    var returnHttp: MovimentAssetReturnHttpModel = new MovimentAssetReturnHttpModel();
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
