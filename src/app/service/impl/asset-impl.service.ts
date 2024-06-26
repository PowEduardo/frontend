abstract class AssetService<T> {

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageModel } from '../../model/page-model';
import { Crud } from '../crud.service';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { PageQuery } from '../../model/page-query';
import { AssetHttpModel } from '../../model/http/asset-http-model';
import { AssetDetailsHttpModel } from '../../model/http/asset-details-http-model';
import { AssetConsolidateHttpModel } from '../../model/http/asset-consolidate-http-model';

@Injectable({
  providedIn: 'root'
})
export class AssetServiceImpl implements Crud<AssetHttpModel> {

  baseUrl: string = "http://localhost:8080/assets";

  constructor(private readonly httpClient: HttpClient) { }

  getAll(): Observable<AssetHttpModel[]> {
    var pageQuery: PageQuery = new PageQuery;
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

  findById(id: number): Observable<AssetHttpModel> {
    return this.httpClient.get<AssetHttpModel>(this.baseUrl + id);
  }
  create(asset: AssetHttpModel): Observable<AssetHttpModel> {
    return this.httpClient.post<AssetHttpModel>(this.baseUrl, asset);
  }
  update(): Observable<AssetHttpModel> {
    throw new Error('Method not implemented.');
  }
  search(pageQuery: PageQuery): Observable<PageModel<AssetHttpModel>> {
    return this.httpClient.get<PageModel<AssetHttpModel>>(this.baseUrl + ":search?" + pageQuery.toString());
  }

  details(id: number): Observable<AssetDetailsHttpModel> {
    return this.httpClient.get<AssetDetailsHttpModel>(this.baseUrl + "/" + id + "/details");
  }

  consolidated(): Observable<AssetConsolidateHttpModel> {
    return this.httpClient.get<AssetConsolidateHttpModel>(this.baseUrl + "/0/consolidate");
  }
}
