import { MovimentAssetReturnHttpModel } from "../../model/http/moviment-asset-return-http-model";
import { MovimentAssetReturnModel } from "../../model/moviment-asset-return-model";
import { MovimentMapper } from "../moviment-mapper";

export class MovimentReturnMapperImpl extends MovimentMapper {
  override toModel(returnHttp: MovimentAssetReturnHttpModel): MovimentAssetReturnModel {
    var returnModel: MovimentAssetReturnModel = new MovimentAssetReturnModel();
    returnModel.amount = returnHttp.amount;
    returnModel.date = returnHttp.date;
    returnModel.exDividendDate = returnHttp.exDividendDate;
    returnModel.operation = returnHttp.operation;
    returnModel.unitValue = returnHttp.unitValue;
    returnModel.value = returnHttp.value;
    returnModel.id = returnHttp.id;
    return returnModel;
  }
  override toHttp(returnModel: MovimentAssetReturnModel): MovimentAssetReturnHttpModel {
    var returnHttp: MovimentAssetReturnHttpModel = new MovimentAssetReturnHttpModel();
    returnHttp.amount = returnModel.amount;
    returnHttp.date = returnModel.date;
    returnHttp.exDividendDate = returnModel.exDividendDate;
    returnHttp.operation = returnModel.operation;
    returnHttp.unitValue = returnModel.unitValue;
    returnHttp.value = returnModel.value;
    returnHttp.id = returnModel.id;
    returnHttp.type = "STOCK_RETURNS";
    return returnHttp;
  }
}
