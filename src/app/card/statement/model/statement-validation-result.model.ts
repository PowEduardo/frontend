import { ExternalTransactionDTO } from './external-transaction.model';

export class InstallmentValidationDTO {
  installmentId!: number;
  installmentNumber!: number;
  installmentValue!: number;
  hasMatch!: boolean;
  matchedTransaction?: ExternalTransactionDTO;
}

export class StatementValidationResultDTO {
  isValid!: boolean;
  externalTotal!: number;
  statementTotal!: number;
  totalMatches!: boolean;
  installmentValidations!: InstallmentValidationDTO[];
  unmatchedExternalTransactions?: ExternalTransactionDTO[];
}
