import { Injectable } from '@angular/core';
import { InstallmentModel } from '../model/installment-model';
import { Crud } from '../../../../commons/base/movement/service/crud.service';
import { forkJoin, map, mergeMap, Observable, of } from 'rxjs';
import { PageModel } from '../../../../commons/base/model/page-model';
import { PageQuery } from '../../../../commons/base/model/page-query';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../../commons/service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class InstallmentService implements CrudService<InstallmentModel> {
  baseUrl: string = 'http://localhost:8080/cards/1/installments';
  parentId!: number;
  constructor(private readonly httpClient: HttpClient) {
  }

  search(pageQuery: PageQuery): Observable<PageModel<InstallmentModel>> {
    return this.httpClient.get<PageModel<InstallmentModel>>(this.baseUrl + ":search?" + pageQuery.toString());
  }
  readAll(pageQuery: PageQuery): Observable<InstallmentModel[]> {
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
  read(id: number): Observable<InstallmentModel> {
    return this.httpClient.get<InstallmentModel>(this.baseUrl + "/" + id);
  }
  create(body: InstallmentModel): Observable<InstallmentModel> {
    throw new Error('Method not implemented.');
  }
  update(body: InstallmentModel): Observable<InstallmentModel> {
    return this.httpClient.put<InstallmentModel>(this.baseUrl + "/" + body.id, body);
  }
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + "/" + id);
  }
}
