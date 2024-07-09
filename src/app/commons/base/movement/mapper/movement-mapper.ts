import { Crud } from "../../mapper/crud";
import { MovementHttp } from "../model/http/movement-http";
import { MovementModel } from "../model/movement-model";

export abstract class MovementMapper<T extends MovementModel, Y extends MovementHttp> extends Crud<T, Y>{
}
