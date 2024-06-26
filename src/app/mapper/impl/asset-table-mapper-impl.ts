import { Injectable } from "@angular/core";
import { AssetModel } from "../../model/asset-model";
import { RowModel } from "../../model/row-model";
import { TableModel } from "../../model/table-model";
import { DynamicTableMapper } from "../dynamic-table-mapper";

@Injectable({
  providedIn: 'root'
})
export class AssetTableMapperImpl implements DynamicTableMapper<AssetModel> {
  toTableModel(items: AssetModel[]): TableModel {
    var tableModel: TableModel = new TableModel();
    var rows: RowModel[] = [];
    tableModel.headers = ["Ticker", "Value", "Amount", "Current Value", "Average", "Monthly Return", "DY", "ADY", "Buy more", "Paid Value", "Returns"];
    for (let model of items) {
      var row: RowModel = new RowModel();
      row.id = model.id;
      row.columnValues = [
        model.ticker!,
        this.formatNumber(model.value!),
        model.amount!.toString(),
        this.formatNumber(model.currentValue),
        this.formatNumber(model.average),
        this.formatNumber(model.monthlyReturn),
        this.formatNumber(model.dy),
        this.formatNumber(model.ady),
        this.formatNumber(model.targetAmount),
        this.formatNumber(model.paidValue),
        this.formatNumber(model.returns)];
      rows.push(row);
    }
    tableModel.body = rows;
    return tableModel;
  }

  private formatNumber(value: number): string {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
