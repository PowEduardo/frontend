import { MovimentModel } from "./moviment-model";

export class MovimentAssetReturnModel extends MovimentModel {
  operation!: string;
  amount!: number;
  unitValue!: number;
  exDividendDate!: Date;
}
