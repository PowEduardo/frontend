export interface PageQuery {
  query?: string;
  offset: number;
  limit: number;
  sort?: string;
  addQuery(attribute: string, value: string): void;
}
