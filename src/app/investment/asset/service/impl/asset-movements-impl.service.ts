import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { MovementService } from '../../../../commons/base/movement/service/movement.service';
import { AssetMovementHttp } from '../../model/http/asset-movement-http-model';
import { PageModel } from '../../model/page-model';
import { PageQuery } from '../../model/page-query';

@Injectable({
  providedIn: 'root'
})
export class AssetMovementsServiceImpl extends MovementService<AssetMovementHttp> {
  
  constructor(private readonly httpClient: HttpClient) {
    super();
    this.baseUrl = this.baseUrl + "assets/";
   }

  override read(id: number): Observable<AssetMovementHttp> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
  override readAll(pageQuery: PageQuery): Observable<AssetMovementHttp[]> {
    return this.search(pageQuery).pipe(
      mergeMap(firstPage => {
        if (firstPage.last) {
          return of(firstPage.content);
        }
        const otherPagesQueries: PageQuery[] = [];
        for (let i = 1; i < firstPage.totalPages; i++) {
          const pageClone: PageQuery = new PageQuery();
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
  override delete(id: number): Observable<void> {
    console.log(id);
    throw new Error('Method not implemented.');
  }


  search(pageQuery: PageQuery): Observable<PageModel<AssetMovementHttp>> {
    return this.httpClient.get<PageModel<AssetMovementHttp>>(this.baseUrl + this.parentId + "/moviments:search?" + pageQuery.toString());
  }

  create(asset: AssetMovementHttp): Observable<AssetMovementHttp> {
    return this.httpClient.post<AssetMovementHttp>(this.baseUrl + this.parentId + "/moviments", asset);
  }
  update(asset: AssetMovementHttp): Observable<AssetMovementHttp> {
    return this.httpClient.post<AssetMovementHttp>(this.baseUrl + this.parentId + "/moviments/" + asset.id, asset);

  }

}
