abstract class AssetService<T> {

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageModel } from '../../model/page-model';
import { Crud } from '../crud.service';
import { AssetModel } from '../../model/asset-model';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { PageQuery } from '../../model/page-query';

@Injectable({
  providedIn: 'root'
})
export class AssetServiceImpl implements Crud<AssetModel> {

  baseUrl: string = "http://localhost:8080/assets";

  constructor(private readonly httpClient: HttpClient) { }

  getAll(): Observable<AssetModel[]> {
    const pageQuery: PageQuery = { offset: 0, limit: 10, sort: "id" };
    return this.search(pageQuery).pipe(
      mergeMap(firstPage => {
        if (firstPage.last) {
          return of(firstPage.content);
        }
        const otherPagesQueries: PageQuery[] = [];
        for (let i = 1; i < firstPage.totalPages; i++) {
          pageQuery.offset = i;
          otherPagesQueries.push(pageQuery);
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

  findById(id: number): Observable<AssetModel> {
    return this.httpClient.get<AssetModel>(this.baseUrl + id);
  }
  create(asset: AssetModel): Observable<AssetModel> {
    return this.httpClient.post<AssetModel>(this.baseUrl, asset);
  }
  update(): Observable<AssetModel> {
    throw new Error('Method not implemented.');
  }
  search(pageQuery: PageQuery): Observable<PageModel<AssetModel>> {
    if (pageQuery.sort) {
      return this.httpClient.get<PageModel<AssetModel>>(this.baseUrl + ":search?_limit=" + pageQuery.limit + "&_offset=" + pageQuery.offset + "&_sort=" + pageQuery.sort);
    }
    return this.httpClient.get<PageModel<AssetModel>>(this.baseUrl + ":search?_limit=" + pageQuery.limit + "&_offset=" + pageQuery.offset);
  }
}
