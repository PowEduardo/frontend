import { MovementModel } from "./movement-model";

export class AssetMovementModel extends MovementModel {
  amount!: number;
  operation!: string;
  unitValue!: number;
  dueDate!: Date;
  interestRate!: number;
}
