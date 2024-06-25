import { MovimentHttpModel } from "./moviment-http-model";

export class MovimentAssetReturnHttpModel extends MovimentHttpModel {
  operation!: string;
  amount!: number;
  unitValue!: number;
}
