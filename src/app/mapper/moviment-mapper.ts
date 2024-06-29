import { MovimentAssetReturnHttpModel } from "../model/http/moviment-asset-return-http-model";
import { MovimentAssetReturnModel } from "../model/moviment-asset-return-model";

export abstract class MovimentMapper {
  abstract toModel(assetHttp: MovimentAssetReturnHttpModel): MovimentAssetReturnModel;
  abstract toHttp(assetModel: MovimentAssetReturnModel): MovimentAssetReturnHttpModel;
}
