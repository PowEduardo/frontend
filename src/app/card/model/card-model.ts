import { GenericT } from "../../commons/model/generic-t";

export class CardModel extends GenericT {
  name!: string;
  limit!: number; // Credit limit for credit cards
  isActive!: boolean; // Indicates if the card is active
  createdDate!: Date; // Date when the card was created
}
