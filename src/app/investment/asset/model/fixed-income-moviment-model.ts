import { MovementModel } from "./movement-model";

export class FixedIncomeMovementModel extends MovementModel {
  dueDate?: Date;
  operation?: string;
}
