import { MovimentAssetReturnHttpModel } from "../../model/http/moviment-asset-return-http-model";
import { MovimentAssetReturnModel } from "../../model/moviment-asset-return-model";
import { MovimentMapper } from "../moviment-mapper";

export class MovimentReturnMapperImpl extends MovimentMapper {
  override toModel(assetHttp: MovimentAssetReturnHttpModel): MovimentAssetReturnModel {
    throw new Error("Method not implemented.");
  }
  override toHttp(assetModel: MovimentAssetReturnModel): MovimentAssetReturnHttpModel {
    var assetHttp: MovimentAssetReturnHttpModel = new MovimentAssetReturnHttpModel();
    assetHttp.amount = assetModel.amount;
    assetHttp.date = assetModel.date;
    assetHttp.exDividendDate = assetModel.exDividendDate;
    assetHttp.operation = assetModel.operation;
    assetHttp.unitValue = assetModel.unitValue;
    assetHttp.value = assetModel.value;
    assetHttp.id = assetModel.id;
    assetHttp.type = "STOCK_RETURNS";
    return assetHttp;
  }
}
