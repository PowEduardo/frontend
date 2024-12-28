import { MovementHttp } from "../../../commons/base/movement/model/http/movement-http";

export class AccountMovementHttp implements MovementHttp{
  id!: number | null;
  date!: Date;
  value!: number;
  type!: string;
  description!: string;
  category!: string;
}