import { Injectable } from "@angular/core";
import { AssetModel } from "../../model/asset-model";
import { RowModel } from "../../model/row-model";
import { TableModel } from "../../model/table-model";
import { DynamicTableMapper } from "../dynamic-table-mapper";

@Injectable({
  providedIn: 'root'
})
export class AssetTable implements DynamicTableMapper<AssetModel> {
  toTableModel(items: AssetModel[]): TableModel {
    var tableModel: TableModel = new TableModel();
    var rows: RowModel[] = [];
    tableModel.headers = ["id", "ticker", "value"];
    for (let model of items) {
      var row: RowModel = new RowModel();
      row.columnValues = [model.id!.toString(), model.ticker!, model.value!.toString()];
      rows.push(row);
    }
    tableModel.body = rows;
    return tableModel;
  }
}
