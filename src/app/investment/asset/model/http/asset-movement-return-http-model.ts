import { MovementHttp } from "./movement-http";

export class AssetMovementReturnHttp extends MovementHttp {
  operation!: string;
  amount!: number;
  unitValue!: number;
  exDividendDate!: Date;
}
