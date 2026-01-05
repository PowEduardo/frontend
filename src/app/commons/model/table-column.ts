export interface TableColumn {
  key: string;
  label: string;
  format?: (value: unknown, row?: unknown) => string;
  style?: (value: unknown, row?: unknown) => { [key: string]: string; };
}