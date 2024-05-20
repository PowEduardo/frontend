import { MovimentModel } from "../../moviment-model";
import { RowModel } from "../../row-model";
import { RowMapper } from "../row-mapper";

export class MovimentRowMapper implements RowMapper {
  toRow(input: any): RowModel {
    const row = new RowModel();
    const model: MovimentModel = input;
    row.id = model.id;
    row.columnValues = [model.description]
    return row;
  }
}
