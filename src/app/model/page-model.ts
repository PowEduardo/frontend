export class PageModel<T> {
  content!: T[];
  pageable!: Pageable;
  last!: boolean;
  totalPages!: number;
  totalElements!: number;
  first!: boolean;
  size!: number;
  number!: number;
  numberOfElements!: number;
  empty!: boolean;
}
export class Pageable {
  pageNumber!: number;
  pageSize!: number;
  offset!: number;
}