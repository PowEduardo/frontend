import { InvestmentMovementModel } from "./movement-model";

export class FixedIncomeMovementModel extends InvestmentMovementModel {
  dueDate?: Date;
  operation?: string;
}
