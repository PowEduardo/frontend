export class InstallmentModel {
  id!: number;
  installmentNumber!: number;
  totalInstallments!: number;
  value!: number;
  dueDate!: string | Date;
  description?: string;
  paid?: boolean;
}
