import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { Page } from '../base/model/page';
import { PageQuery } from '../base/model/page-query';
import { HttpClient } from '@angular/common/http';
import { PageModel } from '../base/model/page-model';

@Injectable({
  providedIn: 'root'
})
export class BaseCrudService<T> extends CrudService<T> {

  constructor(protected readonly httpClient: HttpClient) {
    super();
    // Get current route and add to baseUrl
    const currentRoute = window.location.pathname;
    this.baseUrl = this.baseUrl +`${currentRoute}`;
  }

  create(request: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, request);
  }
  read(id: number | null): Observable<any> {
    if (id === null) {
      return this.httpClient.get<any>(this.baseUrl);
    }
    return this.httpClient.get<any>(this.baseUrl + "/" + id);
  }
  readAll(pageQuery: PageQuery): Observable<any[]> {
    return this.search(pageQuery).pipe(
      mergeMap(firstPage => {
        if (firstPage.last) {
          return of(firstPage.content);
        }
        const otherPagesQueries: PageQuery[] = [];
        for (let i = 1; i < firstPage.totalPages; i++) {
          const newPage = new PageQuery();
          newPage.offset = i;
          newPage.query = pageQuery.query;
          newPage.sort = pageQuery.sort;
          otherPagesQueries.push(newPage);
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
  update(request: any): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + "/" + request.id, request);
  }
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + "/" + id);
  }
  search(query: PageQuery): Observable<Page<any>> {
    return this.httpClient.get<PageModel<any>>(this.baseUrl + ":search?" + query.toString());
  }
}
