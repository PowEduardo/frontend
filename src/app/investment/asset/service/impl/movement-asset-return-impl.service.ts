import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { MovementService } from '../../../../commons/base/movement/service/movement.service';
import { PageModel } from '../../model/page-model';
import { PageQuery } from '../../../../commons/base/model/page-query';
import { AssetMovementReturnModel } from '../../model/asset-movement-return-model';

@Injectable({
  providedIn: 'root'
})
export class AssetReturnServiceImpl extends MovementService<AssetMovementReturnModel> {


  constructor(private readonly httpClient: HttpClient) {
    super();
    this.baseUrl = this.baseUrl + "assets/";
  }

  override read(id: number): Observable<AssetMovementReturnModel> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
  override readAll(pageQuery: PageQuery): Observable<AssetMovementReturnModel[]> {
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


  search(pageQuery: PageQuery): Observable<PageModel<AssetMovementReturnModel>> {
    return this.httpClient.get<PageModel<AssetMovementReturnModel>>(this.baseUrl + this.parentId + "/returns:search?" + pageQuery.toString());
  }

  create(movement: AssetMovementReturnModel): Observable<AssetMovementReturnModel> {
    return this.httpClient.post<AssetMovementReturnModel>(this.baseUrl + this.parentId + "/returns", movement);
  }
  update(movement: AssetMovementReturnModel): Observable<AssetMovementReturnModel> {
    return this.httpClient.post<AssetMovementReturnModel>(this.baseUrl + this.parentId + "/returns/" + movement.id, movement);

  }
}
