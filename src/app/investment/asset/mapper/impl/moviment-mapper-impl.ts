import { InvestmentMovementHttp } from "../../model/http/movement-http";
import { InvestmentMovementModel } from "../../model/movement-model";
import { MovementMapper } from "../movement-mapper";

export abstract class MovementMapperImpl<T extends InvestmentMovementModel, Y extends InvestmentMovementHttp> extends MovementMapper<T, Y>{
  buildModel(response: InvestmentMovementHttp): InvestmentMovementModel {
    const model: InvestmentMovementModel = new InvestmentMovementModel();
    model.id = response.id;
    model.date = response.date;
    model.value = response.value;
    return model;
  }
  buildHttp(model: InvestmentMovementModel): InvestmentMovementHttp {
    const request: InvestmentMovementHttp = new InvestmentMovementHttp();
    request.id = model.id;
    request.date = model.date;
    request.value = model.value;
    return request;
  }
}
