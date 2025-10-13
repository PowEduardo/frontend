export interface TableColumn {
  key: string;
  label: string;
  format?: (value: unknown, row?: any) => string;
}