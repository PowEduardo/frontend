import { MovementModel } from "../../../commons/base/movement/model/movement-model";

export class InvestmentMovementModel implements MovementModel{
  category!: string;
  date!: Date;
  description!: string;
  id!: number | null;
  type!: string;
  value!: number;
}
