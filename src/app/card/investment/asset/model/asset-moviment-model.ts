import { MovimentModel } from "./moviment-model";

export class AssetMovimentModel extends MovimentModel {
  amount!: number;
  operation!: string;
  unitValue!: number;
}
