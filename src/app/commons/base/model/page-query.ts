export class PageQuery{

  query?: string;
  offset = 0;
  limit = 10;
  sort?: string = "-id";

  toString(): string {
    let response = "";
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

  addQuery(attribute: string, value: string): void{
    if (this.query) {
      this.query = this.query + "," + attribute + ":" + value;
    } else {
      this.query = attribute + ":" + value;
    }
  }
}
