import { Observable } from 'rxjs';
import { Page } from '../base/model/page';
import { PageQuery } from '../base/model/page-query';

export abstract class CrudService<T> {

  baseUrl: string = "http://localhost:8080/";

  abstract create(request: T): Observable<T>;
  abstract read(id: number): Observable<T>;
  abstract readAll(pageQuery: PageQuery): Observable<T[]>;
  abstract update(request: T): Observable<T>;
  abstract delete(id: number): Observable<void>;
  abstract search(query: PageQuery): Observable<Page<T>>;
}
