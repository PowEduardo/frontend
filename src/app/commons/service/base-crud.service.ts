import { Injectable, inject } from '@angular/core';
import { CrudService } from './crud.service';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { Page } from '../base/model/page';
import { PageQuery } from '../base/model/page-query';
import { HttpClient } from '@angular/common/http';
import { PageModel } from '../base/model/page-model';

@Injectable()
export class BaseCrudService<T> extends CrudService<T> {
  protected readonly httpClient = inject(HttpClient);


  constructor() {
    super();
    // Get current route and add to baseUrl
    const currentRoute = window.location.pathname;
    this.baseUrl = this.baseUrl +`${currentRoute}`;
  }

  create(request: any): Observable<T> {
    return this.httpClient.post<T>(this.baseUrl, request);
  }
  read(id: number | null): Observable<T> {
    if (id === null) {
      return this.httpClient.get<T>(this.baseUrl);
    }
    return this.httpClient.get<T>(this.baseUrl + "/" + id);
  }
  readAll(pageQuery: PageQuery): Observable<T[]> {
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
  update(request: any): Observable<T> {
    return this.httpClient.put<T>(this.baseUrl + "/" + request.id, request);
  }
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + "/" + id);
  }
  search(query: PageQuery): Observable<Page<T>> {
    return this.httpClient.get<PageModel<T>>(this.baseUrl + "/search?" + query.toString());
  }
}
