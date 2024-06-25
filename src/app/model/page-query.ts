export class PageQuery {

  query?: string;
  offset: number = 0;
  limit: number = 10;
  sort?: string = "id";

  toString(): string {
    var response: string = "";
    response = response.concat("_offset=").concat(this.offset.toString())
      .concat("&_limit=").concat(this.limit.toString());
    if (this.sort) {
      response = response.concat("&_sort=").concat(this.sort);
    }
    if (this.query) {
      response = response.concat("&_q=").concat(this.query);
    }
    return response;
  }
}
