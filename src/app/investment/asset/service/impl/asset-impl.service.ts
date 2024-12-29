import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { AssetConsolidateHttpModel } from '../../../model/http/asset-consolidate-http-model';
import { AssetDetailsHttpModel } from '../../model/http/asset-details-http-model';
import { PageModel } from '../../model/page-model';
import { PageQuery } from '../../model/page-query';
import { Crud } from '../crud.service';
import { AssetModel } from '../../model/asset-model';

@Injectable({
  providedIn: 'root'
})
export class AssetServiceImpl implements Crud<AssetModel> {

  baseUrl: string = "http://localhost:8080/assets";

  constructor(private readonly httpClient: HttpClient) { }

  getAll(pageQuery: PageQuery): Observable<AssetModel[]> {
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
    return this.httpClient.get<AssetModel>(this.baseUrl + "/" + id);
  }
  create(asset: AssetModel): Observable<AssetModel> {
    return this.httpClient.post<AssetModel>(this.baseUrl, asset);
  }
  update(asset: AssetModel): Observable<AssetModel> {
    return this.httpClient.put<AssetModel>(this.baseUrl + "/" + asset.id, asset);
  }
  search(pageQuery: PageQuery): Observable<PageModel<AssetModel>> {
    return this.httpClient.get<PageModel<AssetModel>>(this.baseUrl + ":search?" + pageQuery.toString());
  }

  details(id: number): Observable<AssetDetailsHttpModel> {
    return this.httpClient.get<AssetDetailsHttpModel>(this.baseUrl + "/" + id + "/details");
  }

  consolidated(assetType: string): Observable<AssetConsolidateHttpModel> {
    return this.httpClient.get<AssetConsolidateHttpModel>(this.baseUrl + "/consolidate", { params: { type: assetType } });
  }
}
