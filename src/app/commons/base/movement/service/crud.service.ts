import { Observable } from "rxjs";
import { PageQuery } from "../../model/page-query";
import { PageModel } from "../../model/page-model";

export abstract class Crud<T> {

  abstract search(pageQuery: PageQuery): Observable<PageModel<T>>;
  abstract getAll(pageQuery?: PageQuery): Observable<T[]>;
  abstract findById(id: number): Observable<T>;
  abstract create(body: T): Observable<T>;
  abstract update(body: T): Observable<T>;
}
