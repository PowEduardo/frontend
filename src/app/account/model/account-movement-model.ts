import { MovementModel } from "../../commons/base/movement/model/movement-model";

export class AccountMovementModel implements MovementModel{
  category!: string;
  date!: Date;
  description!: string;
  id!: number | null;
  value!: number;
  type!: string;
}