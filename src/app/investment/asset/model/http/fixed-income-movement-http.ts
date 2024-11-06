import { InvestmentMovementHttp } from "./movement-http";

export class FixedIncomeMovementHttp extends InvestmentMovementHttp {
  dueDate?: Date;
  operation?: string;
}
