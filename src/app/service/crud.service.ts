import { Observable } from "rxjs";
import { PageModel } from "../model/page-model";
import { AssetModel } from "../model/asset-model";
import { PageQuery } from "../model/page-query";

export abstract class Crud<T> {

  abstract search(pageQuery: PageQuery): Observable<PageModel<T>>;
  abstract getAll(): Observable<T[]>;
  abstract findById(id: number): Observable<T>;
  abstract create(asset: AssetModel): Observable<T>;
  abstract update(): Observable<T>;
}
