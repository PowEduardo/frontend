import { MovementHttpInterface } from "../../../../commons/base/movement/model/http/movement-http";

export class InvestmentMovementHttp implements MovementHttpInterface {
  id!: number | null;
  date!: Date;
  value!: number;
  type!: string;
  description!: string;
  category!: string;
  account!: number;
}
