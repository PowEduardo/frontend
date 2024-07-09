import { MovementHttp } from "./movement-http";

export class FixedIncomeMovementHttp extends MovementHttp {
  dueDate?: Date;
  operation?: string;
}
