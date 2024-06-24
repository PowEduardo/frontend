import { TableModel } from "../model/table-model";

export abstract class DynamicTableMapper<T> {

  abstract toTableModel(items: T[]): TableModel;
}
