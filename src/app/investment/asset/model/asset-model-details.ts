import { AssetModel } from "./asset-model";

export class AssetDetailsModel extends AssetModel {
  ady!: number;
  amount!: number;
  average!: number;
  currentValue!: number;
  difference!: number;
  dy!: number;
  lastReturn!: number;
  monthlyReturn!: number;
  paidValue!: number;
  returns!: number;
  targetAmount!: number;
  indexer!: string;
  interestRate!: number;
}
