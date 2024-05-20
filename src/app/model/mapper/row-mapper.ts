import { RowModel } from "../row-model";

export interface RowMapper {

  toRow(model: any): RowModel;

}
