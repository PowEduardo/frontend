import { InstallmentModel } from './installment-model';

export class StatementModel {
  id!: number;
  referenceMonth!: string;
  yearMonth!: string;
  value!: number;
  totalAmount!: number;
  discount!: number;
  interestAmount?: number;
  paid?: boolean;
  dueDate?: string | Date;
  installments?: InstallmentModel[];
}
