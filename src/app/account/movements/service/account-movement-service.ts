import { forkJoin, map, mergeMap, Observable, of } from "rxjs";
import { Page } from "../../../commons/base/model/page";
import { PageQuery } from "../../../commons/base/model/page-query";
import { MovementHttp } from "../../../commons/base/movement/model/http/movement-http";
import { MovementService } from "../../../commons/base/movement/service/movement.service";
import { HttpClient } from "@angular/common/http";
import { PageModel } from "../../../commons/base/model/page-model";
import { Injectable } from "@angular/core";
import { PageQueryModel } from "../../../commons/base/model/page-query-model";

@Injectable()
export class AccountMovementService extends MovementService<MovementHttp>{

  constructor(private readonly httpClient: HttpClient) {
    super();
    this.baseUrl = this.baseUrl.concat("accounts/{parentId}/movements");
   }
   
  create(request: MovementHttp): Observable<MovementHttp> {
    throw new Error("Method not implemented.");
  }
  read(id: number): Observable<MovementHttp> {
    throw new Error("Method not implemented.");
  }
  readAll(pageQuery: PageQuery): Observable<MovementHttp[]> {
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
  update(request: MovementHttp, id: number): Observable<MovementHttp> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Observable<void> {
    throw new Error("Method not implemented.");
  }
  search(query: PageQuery): Observable<Page<MovementHttp>> {
    return this.httpClient.get<PageModel<MovementHttp>>(this.baseUrl.replace("{parentId}", this.parentId.toString()) + ":search?" + query.toString());

  }
}
