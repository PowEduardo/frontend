import { Account } from "./account";

export class AccountDetailsModel implements Account {
  bank!: string;
  branch!: string;
  createDate!: Date;
  id!: number;
  number!: string;
  primary!: boolean;
  balance: number = 0;
}
