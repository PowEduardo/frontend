export class PageModel {
  content: any[] | undefined;
  pageable: Pageable | undefined;
  last: boolean | undefined;
  totalPages: number | undefined;
  totalElements: number | undefined;
  first: boolean | undefined;
  size: number | undefined;
  number: number | undefined;
  numberOfElements: number | undefined;
  empty: boolean | undefined;
}
export class Pageable {
  pageNumber: number | undefined;
  pageSize: number | undefined;
  offset: number | undefined;
}