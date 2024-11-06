import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, map, mergeMap, Observable, of } from "rxjs";
import { Page } from "../../../commons/base/model/page";
import { PageModel } from "../../../commons/base/model/page-model";
import { PageQuery } from "../../../commons/base/model/page-query";
import { PageQueryModel } from "../../../commons/base/model/page-query-model";
import { MovementHttp } from "../../../commons/base/movement/model/http/movement-http";
import { MovementService } from "../../../commons/base/movement/service/movement.service";
import { AccountMovementHttp } from "../../model/http/account-movement-model";

@Injectable()
export class AccountMovementService extends MovementService<AccountMovementHttp>{

  constructor(private readonly httpClient: HttpClient) {
    super();
    this.baseUrl = this.baseUrl.concat("accounts/{parentId}/movements");
   }
   
  create(request: AccountMovementHttp): Observable<AccountMovementHttp> {
    return this.httpClient.post<AccountMovementHttp>(this.baseUrl, request);
  }
  read(id: number): Observable<AccountMovementHttp> {
    throw new Error("Method not implemented.");
  }
  readAll(pageQuery: PageQuery): Observable<AccountMovementHttp[]> {
    return this.search(pageQuery).pipe(
      mergeMap(firstPage => {
        if (firstPage.last) {
          return of(firstPage.content);
        }
        const otherPagesQueries: PageQuery[] = [];
        for (let i = 1; i < firstPage.totalPages; i++) {
          const pageClone: PageQuery = new PageQueryModel();
          pageClone.offset = i;
          pageClone.sort = pageQuery.sort;
          pageClone.limit = pageQuery.limit;
          pageClone.query = pageQuery.query;
          otherPagesQueries.push(pageClone);
        }
        return forkJoin(otherPagesQueries.map(pageQuery => this.search(pageQuery)))
          .pipe(
            map(otherPages => [firstPage].concat(otherPages)
              .map(page => page.content)
              .reduce((allContent, pageContent) => allContent.concat(pageContent))
            ));
      })
    );
  }
  update(request: MovementHttp, id: number): Observable<AccountMovementHttp> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Observable<void> {
    throw new Error("Method not implemented.");
  }
  search(query: PageQuery): Observable<Page<AccountMovementHttp>> {
    return this.httpClient.get<PageModel<AccountMovementHttp>>(this.baseUrl.replace("{parentId}", this.parentId.toString()) + ":search?" + query.toString());

  }
}
