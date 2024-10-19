import { MovementMapper } from "../../../commons/base/movement/mapper/movement-mapper";
import { MovementHttp } from "../../../investment/asset/model/http/movement-http";
import { MovementModel } from "../../../investment/asset/model/movement-model";

export class AccountMovementMapperImpl implements MovementMapper<MovementModel, MovementHttp> {
  toHttp(model: MovementModel): MovementHttp {
    throw new Error("Method not implemented.");
  }
  toModel(response: MovementHttp): MovementModel {
    const model: MovementModel = new MovementModel();
    model.id = response.id;
    model.date = response.date;
    model.type = response.type;
    model.value = response.value;
    model.description = response.description;
    return model;
  }
}
