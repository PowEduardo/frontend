export class CardDetailsModel {
  name!: string;
  statementDay!: number;
  createDate!: Date;
  currentStatementValue!: number;
  lastStatementValue!: number;
  nextStatementValue!: number;
  bank?: string;
  cardType?: string;
  balance!: number;
  creditLimit!: number;
}
