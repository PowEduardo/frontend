import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { AssetModel } from '../../model/asset-model';
import { MovimentAssetHttpModel } from '../../model/http/moviment-asset-http-model';
import { PageModel } from '../../model/page-model';
import { PageQuery } from '../../model/page-query';
import { Crud } from '../crud.service';

@Injectable({
  providedIn: 'root'
})
export class AssetMovimentsServiceImpl implements Crud<MovimentAssetHttpModel> {

  baseUrl: string = "http://localhost:8080/assets/";
  assetId: number = 0;

  constructor(private readonly httpClient: HttpClient) { }

  search(pageQuery: PageQuery): Observable<PageModel<MovimentAssetHttpModel>> {
    return this.httpClient.get<PageModel<MovimentAssetHttpModel>>(this.baseUrl + ":search?" + pageQuery.toString());
  }
  getAll(pageQuery: PageQuery): Observable<MovimentAssetHttpModel[]> {
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
  findById(id: number): Observable<MovimentAssetHttpModel> {
    throw new Error('Method not implemented.');
  }
  create(asset: MovimentAssetHttpModel): Observable<MovimentAssetHttpModel> {
    return this.httpClient.post<MovimentAssetHttpModel>(this.baseUrl + this.assetId + "/moviments", asset);
  }
  update(asset: MovimentAssetHttpModel): Observable<MovimentAssetHttpModel> {
    throw new Error('Method not implemented.');
  }

}
