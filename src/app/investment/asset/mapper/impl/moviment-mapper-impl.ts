import { MovementHttp } from "../../model/http/movement-http";
import { MovementModel } from "../../model/movement-model";
import { MovementMapper } from "../movement-mapper";

export abstract class MovementMapperImpl<T extends MovementModel, Y extends MovementHttp> extends MovementMapper<T, Y>{
  buildModel(response: MovementHttp): MovementModel {
    const model: MovementModel = new MovementModel();
    model.id = response.id;
    model.date = response.date;
    model.value = response.value;
    return model;
  }
  buildHttp(model: MovementModel): MovementHttp {
    const request: MovementHttp = new MovementHttp();
    request.id = model.id;
    request.date = model.date;
    request.value = model.value;
    return request;
  }
}
