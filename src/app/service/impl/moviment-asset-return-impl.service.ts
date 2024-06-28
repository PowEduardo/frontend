import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { AssetModel } from '../../model/asset-model';
import { MovimentAssetReturnHttpModel } from '../../model/http/moviment-asset-return-http-model';
import { PageModel } from '../../model/page-model';
import { PageQuery } from '../../model/page-query';
import { Crud } from '../crud.service';
import { MovimentAssetHttpModel } from '../../model/http/moviment-asset-http-model';

@Injectable({
  providedIn: 'root'
})
export class MovimentAssetReturnServiceImpl implements Crud<MovimentAssetReturnHttpModel> {

  baseUrl: string = "http://localhost:8080/moviments/returns";

  constructor(private readonly httpClient: HttpClient) { }

  search(pageQuery: PageQuery): Observable<PageModel<MovimentAssetReturnHttpModel>> {
    return this.httpClient.get<PageModel<MovimentAssetReturnHttpModel>>(this.baseUrl + ":search?" + pageQuery.toString());
  }

  getAll(pageQuery: PageQuery): Observable<MovimentAssetReturnHttpModel[]> {
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
  findById(id: number): Observable<MovimentAssetReturnHttpModel> {
    throw new Error('Method not implemented.');
  }
  create(body: MovimentAssetReturnHttpModel): Observable<MovimentAssetReturnHttpModel> {
    return this.httpClient.post<MovimentAssetReturnHttpModel>(this.baseUrl, body);
  }
  update(): Observable<MovimentAssetReturnHttpModel> {
    throw new Error('Method not implemented.');
  }
}
