import { Account } from './account';

/**
 * Account Details Model
 * Extended account information including current balance.
 * Used for displaying complete account details in UI.
 */
export class AccountDetailsModel implements Account {
  /** Bank identifier/name */
  bank!: string;
  
  /** Bank branch number */
  branch!: string;
  
  /** Account creation date */
  createDate!: Date;
  
  /** Account ID (unique identifier) */
  id!: number;
  
  /** Account number */
  number!: string;
  
  /** Is this the primary/default account? */
  primary!: boolean;
  
  /** Current account balance (calculated from movements) */
  balance = 0;
}
