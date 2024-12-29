import { Crud } from "../../mapper/crud";
import { MovementHttpInterface } from "../model/http/movement-http";
import { MovementModelInterface } from "../model/movement-model-interface";

export abstract class MovementMapper<T extends MovementModelInterface, Y extends MovementHttpInterface> extends Crud<T, Y>{
}
