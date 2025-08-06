import { GenericT } from "../../commons/model/generic-t";

export class CardModel extends GenericT {
  name!: string;
  createdDate!: Date;
  statementDay!: number;
}
