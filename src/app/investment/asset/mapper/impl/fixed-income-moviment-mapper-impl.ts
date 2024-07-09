import { MovementType } from "../../../../commons/base/movement/enum/movement-type";
import { MovementMapper } from "../../../../commons/base/movement/mapper/movement-mapper";
import { FixedIncomeMovementModel } from "../../model/fixed-income-moviment-model";
import { FixedIncomeMovementHttp } from "../../model/http/fixed-income-movement-http";

export class FixedIncomeMovimentMapperImpl extends MovementMapper<FixedIncomeMovementModel, FixedIncomeMovementHttp>{

  override toModel(response: FixedIncomeMovementHttp): FixedIncomeMovementModel {
    const model: FixedIncomeMovementModel = new FixedIncomeMovementModel();
    model.id = response.id;
    model.date = response.date;
    model.operation = response.operation!;
    model.type = response.type;
    model.dueDate = response.dueDate;
    model.value = response.value;
    return model;
  }

  override toHttp(model: FixedIncomeMovementModel): FixedIncomeMovementHttp {
    const request: FixedIncomeMovementHttp = new FixedIncomeMovementHttp();
    request.id = model.id;
    request.date = model.date;
    request.operation = model.operation;
    request.type = MovementType.ASSET_MOVEMENT;
    request.value = model.value;
    return request;
  }
}
