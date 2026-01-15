import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { MovementService } from '../../../../commons/base/movement/service/movement.service';
import { PageModel } from '../../model/page-model';
import { PageQuery } from '../../../../commons/base/model/page-query';
import { AssetMovementReturnModel } from '../../model/asset-movement-return-model';

/**
 * Asset Return Service Implementation
 *
 * Manages return/dividend transactions for investment assets.
 * Extends MovementService for consistent movement handling.
 *
 * Tracks all distributions, dividends, and returns received
 * from investments.
 *
 * Base endpoint: GET /assets/{assetId}/returns
 *
 * @see AssetMovementReturnModel
 * @see MovementService
 */
@Injectable({
  providedIn: 'root'
})
export class AssetReturnServiceImpl extends MovementService<AssetMovementReturnModel> {
  private readonly httpClient = inject(HttpClient);


  /**
   * Constructor
   * @param httpClient Angular HTTP client for API requests
   */
  constructor() {
    super();
    this.baseUrl = this.baseUrl + "/assets/";
  }

  /**
   * Read single return (not implemented for assets)
   *
   * @param id Return ID
   * @throws Error Method not implemented
   */
  override read(_id: number): Observable<AssetMovementReturnModel> {
    throw new Error('Method not implemented.');
  }

  /**
   * Get all asset returns with pagination
   *
   * Retrieves all returns/dividends for a specific asset.
   * Automatically fetches multiple pages if needed.
   * GET /assets/{assetId}/returns:search?offset=X&limit=Y
   *
   * @param pageQuery Pagination parameters
   * @returns Observable<AssetMovementReturnModel[]> Complete list of returns
   */
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
  /**
   * Delete asset return
   * DELETE /assets/{assetId}/returns/{returnId}
   *
   * @param id Return ID to delete
   * @returns Observable<void>
   */
  override delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + this.parentId + "/returns/" + id.toString());
  }

  /**
   * Search asset returns with filtering and pagination
   * GET /assets/{assetId}/returns:search?offset=X&limit=Y&query=...
   *
   * @param pageQuery Search parameters
   * @returns Observable<PageModel<AssetMovementReturnModel>> Paginated returns
   */
  search(pageQuery: PageQuery): Observable<PageModel<AssetMovementReturnModel>> {
    return this.httpClient.get<PageModel<AssetMovementReturnModel>>(this.baseUrl + this.parentId + "/returns:search?" + pageQuery.toString());
  }

  /**
   * Create new asset return
   * POST /assets/{assetId}/returns
   *
   * Records a new dividend, distribution, or other return from the asset.
   *
   * @param movement Return data to create
   * @returns Observable<AssetMovementReturnModel> Created return with ID
   */
  create(movement: AssetMovementReturnModel): Observable<AssetMovementReturnModel> {
    return this.httpClient.post<AssetMovementReturnModel>(this.baseUrl + this.parentId + "/returns", movement);
  }

  /**
   * Update existing asset return
   * PUT /assets/{assetId}/returns/{returnId}
   *
   * @param movement Return data with ID to update
   * @returns Observable<AssetMovementReturnModel> Updated return
   */
  update(movement: AssetMovementReturnModel): Observable<AssetMovementReturnModel> {
    return this.httpClient.put<AssetMovementReturnModel>(this.baseUrl + this.parentId + "/returns/" + movement.id, movement);
  }
}
