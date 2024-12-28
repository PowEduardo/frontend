import { MovementMapper } from "../../../commons/base/movement/mapper/movement-mapper";
import { AccountMovementModel } from "../../model/account-movement-model";
import { AccountMovementHttp } from "../../model/http/account-movement-model";

export class AccountMovementMapperImpl implements MovementMapper<AccountMovementModel, AccountMovementHttp> {
  toHttp(model: AccountMovementModel): AccountMovementHttp {
    const http: AccountMovementModel = new AccountMovementModel();
    http.id = model.id;
    http.date = model.date;
    http.type = model.type;
    http.value = model.value;
    http.description = model.description;
    return model;
  }
  toModel(response: AccountMovementHttp): AccountMovementModel {
    const model: AccountMovementModel = new AccountMovementModel();
    model.id = response.id;
    model.date = response.date;
    model.type = response.type;
    model.value = response.value;
    model.description = response.description;
    return model;
  }
}
