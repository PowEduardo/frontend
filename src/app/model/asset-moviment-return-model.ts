import { MovimentModel } from "./moviment-model";

export class AssetMovimentReturnModel extends MovimentModel {
  operation!: string;
  amount!: number;
  unitValue!: number;
  exDividendDate!: Date;
}
