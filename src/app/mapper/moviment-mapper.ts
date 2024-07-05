import { MovimentHttpModel } from "../model/http/moviment-http-model";
import { MovimentModel } from "../model/moviment-model";

export abstract class MovimentMapper<T extends MovimentModel, Y extends MovimentHttpModel> {
  abstract toModel(assetHttp: Y): T;
  abstract toHttp(assetModel: T): T;
}
