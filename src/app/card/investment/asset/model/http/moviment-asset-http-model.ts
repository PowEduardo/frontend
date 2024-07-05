import { MovimentHttpModel } from "./moviment-http-model";

export class MovimentAssetHttpModel extends MovimentHttpModel {
  operation!: string;
  amount!: number;
  unitValue!: number;
}
