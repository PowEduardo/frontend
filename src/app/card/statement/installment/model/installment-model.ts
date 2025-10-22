import { CardMovementModel } from "../../../movements/model/card-movement-model";

export class InstallmentModel {
  description!: string;
  id!: number;
  installment!: number;
  value!: number;
  date!: Date;
  movement!: CardMovementModel;
}
