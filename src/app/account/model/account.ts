/**
 * Account Interface
 * Represents a bank account with basic identifying information.
 */
export interface Account {
  /** Bank identifier/name (e.g., 'Banco do Brasil') */
  bank: string;
  
  /** Bank branch number */
  branch: string;
  
  /** Account creation date */
  createDate: Date;
  
  /** Account ID (unique identifier) */
  id: number;
  
  /** Account number */
  number: string;
  
  /** Is this the primary/default account? */
  primary: boolean;
}
