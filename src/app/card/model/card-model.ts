import { GenericT } from "../../commons/model/generic-t";
import { CardMovementDTO, CardStatementDTO } from "./card-dto";

/**
 * Card Model extending GenericT for use in generic components.
 * Mirrors the backend Card structure.
 */
export class CardModel extends GenericT {
  name!: string;
  cardNumber?: string;
  cardType?: string;
  bank?: string;
  balance?: number;
  creditLimit?: number;
  createdDate!: Date;
  statementDay!: number;
  
  // Optional relationships
  movements?: CardMovementDTO[];
  statements?: CardStatementDTO[];
}
