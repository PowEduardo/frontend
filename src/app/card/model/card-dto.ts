/**
 * Card-related Data Transfer Objects (DTOs)
 * These interfaces define the contract for data transferred between frontend and backend.
 */

/**
 * Credit Card Movement DTO.
 */
export interface CardMovementDTO {
  id?: number;
  date: Date;
  value: number;
  description?: string;
  type: string;
  paid?: boolean;
}

/**
 * Credit Card Statement DTO.
 */
export interface CardStatementDTO {
  id?: number;
  referenceMonth: string; // YearMonth as string "2025-12"
  value: number;
  discounts?: number;
  paid?: boolean;
  
  // Optional relationships
  installments?: CardInstallmentDTO[];
}

/**
 * Credit Card Installment DTO.
 */
export interface CardInstallmentDTO {
  id?: number;
  installment: number;
  value: number;
  referenceDate: string; // YearMonth as string
  entryType: string;
}
