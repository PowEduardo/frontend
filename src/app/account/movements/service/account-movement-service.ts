import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { forkJoin, map, mergeMap, Observable, of } from "rxjs";
import { Page } from "../../../commons/base/model/page";
import { PageModel } from "../../../commons/base/model/page-model";
import { PageQuery } from "../../../commons/base/model/page-query";
import { PageQueryModel } from "../../../commons/base/model/page-query-model";
import { MovementHttpInterface } from "../../../commons/base/movement/model/http/movement-http";
import { MovementService } from "../../../commons/base/movement/service/movement.service";
import { AccountMovementModel } from "../../model/account-movement-model";

/**
 * Account Movement Service
 * Handles all HTTP operations for account movements.
 * Implements pagination, sorting, and CRUD operations.
 * 
 * Base endpoint: GET /api/v1/accounts/{parentId}/movements
 */
@Injectable()
export class AccountMovementService extends MovementService<AccountMovementModel> {
  private readonly httpClient = inject(HttpClient);


  constructor() {
    super();
    this.baseUrl = this.baseUrl.concat("/api/v1/accounts/{parentId}/movements");
  }

  /**
   * Create a new account movement
   * POST /api/v1/accounts/{parentId}/movements
   * 
   * @param request AccountMovementModel with movement data
   * @returns Observable<AccountMovementModel> created movement with ID
   */
  create(request: AccountMovementModel): Observable<AccountMovementModel> {
    return this.httpClient.post<AccountMovementModel>(
      this.baseUrl.replace("{parentId}", this.parentId.toString()),
      request
    );
  }

  /**
   * Get a single account movement by ID
   * GET /api/v1/accounts/{parentId}/movements/{id}
   * 
   * @param id Movement ID
   * @returns Observable<AccountMovementModel> movement data
   */
  read(id: number): Observable<AccountMovementModel> {
    return this.httpClient.get<AccountMovementModel>(
      this.baseUrl.replace("{parentId}", this.parentId.toString()) + "/" + id.toString()
    );
  }

  /**
   * Get all account movements with pagination support
   * Automatically handles multiple pages by fetching all pages in parallel.
   * GET /api/v1/accounts/{parentId}/movements?page=0&size=20
   * 
   * @param pageQuery PageQuery with pagination and sorting params
   * @returns Observable<AccountMovementModel[]> all movements flattened
   */
  readAll(pageQuery: PageQuery): Observable<AccountMovementModel[]> {
    return this.search(pageQuery).pipe(
      mergeMap(firstPage => {
        // If only one page, return it
        if (firstPage.last) {
          return of(firstPage.content);
        }

        // Fetch remaining pages in parallel
        const otherPagesQueries: PageQuery[] = [];
        for (let i = 1; i < firstPage.totalPages; i++) {
          const pageClone: PageQuery = new PageQueryModel();
          pageClone.offset = i;
          pageClone.sort = pageQuery.sort;
          pageClone.limit = pageQuery.limit;
          pageClone.query = pageQuery.query;
          otherPagesQueries.push(pageClone);
        }

        return forkJoin(otherPagesQueries.map(pageQuery => this.search(pageQuery)))
          .pipe(
            map(otherPages =>
              [firstPage]
                .concat(otherPages)
                .map(page => page.content)
                .reduce((allContent, pageContent) => allContent.concat(pageContent))
            )
          );
      })
    );
  }

  /**
   * Update an existing account movement
   * PUT /api/v1/accounts/{parentId}/movements/{id}
   * 
   * @param request MovementHttpInterface with ID and updated data
   * @returns Observable<AccountMovementModel> updated movement
   */
  update(request: MovementHttpInterface): Observable<AccountMovementModel> {
    return this.httpClient.put<AccountMovementModel>(
      this.baseUrl.replace("{parentId}", this.parentId.toString()) + "/" + request.id!.toString(),
      request
    );
  }

  /**
   * Delete an account movement by ID
   * DELETE /api/v1/accounts/{parentId}/movements/{id}
   * 
   * @param id Movement ID
   * @returns Observable<void> completion notification
   */
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.baseUrl.replace("{parentId}", this.parentId.toString()) + "/" + id.toString()
    );
  }

  /**
   * Search account movements with pagination and sorting
   * GET /api/v1/accounts/{parentId}/movements:search?...params
   * 
   * @param query PageQuery with search, sort, and pagination params
   * @returns Observable<Page<AccountMovementModel>> paginated results
   */
  search(query: PageQuery): Observable<Page<AccountMovementModel>> {
    return this.httpClient.get<PageModel<AccountMovementModel>>(
      this.baseUrl.replace("{parentId}", this.parentId.toString()) + "/search?" + query.toString()
    );
  }

  /**
   * Mark an account movement as paid
   * PATCH /api/v1/accounts/{parentId}/movements/{id}/mark-as-paid
   * 
   * @param id Movement ID
   * @returns Observable<AccountMovementModel> updated movement with paid status
   */
  markAsPaid(id: number): Observable<AccountMovementModel> {
    return this.httpClient.patch<AccountMovementModel>(
      this.baseUrl.replace("{parentId}", this.parentId.toString()) + "/" + id.toString() + "/mark-as-paid",
      {}
    );
  }
}
