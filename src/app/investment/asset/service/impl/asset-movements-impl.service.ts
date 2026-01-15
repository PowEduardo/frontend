import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { MovementService } from '../../../../commons/base/movement/service/movement.service';
import { AssetMovementModel } from '../../model/asset-movement-model';
import { PageModel } from '../../model/page-model';
import { PageQuery } from '../../../../commons/base/model/page-query';

/**
 * Asset Movements Service Implementation
 *
 * Manages all buy/sell transactions for investment assets.
 * Extends MovementService for consistent movement handling.
 *
 * Base endpoint: GET /assets/{assetId}/movements
 *
 * @see AssetMovementModel
 * @see MovementService
 */
@Injectable({
  providedIn: 'root'
})
export class AssetMovementsServiceImpl extends MovementService<AssetMovementModel> {
  
  /**
   * Constructor
   * @param httpClient Angular HTTP client for API requests
   */
  constructor(private readonly httpClient: HttpClient) {
    super();
    this.baseUrl = this.baseUrl + "/assets/";
  }

  /**
   * Read single movement (not implemented for assets)
   *
   * @param id Movement ID
   * @throws Error Method not implemented
   */
  override read(_id: number): Observable<AssetMovementModel> {
    throw new Error('Method not implemented.');
  }

  /**
   * Get all asset movements with pagination
   *
   * Retrieves all movements for a specific asset.
   * Automatically fetches multiple pages if needed.
   * GET /assets/{assetId}/movements:search?offset=X&limit=Y
   *
   * @param pageQuery Pagination parameters
   * @returns Observable<AssetMovementModel[]> Complete list of movements
   */
  override readAll(pageQuery: PageQuery): Observable<AssetMovementModel[]> {
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
   * Delete asset movement
   * DELETE /assets/{assetId}/movements/{movementId}
   *
   * @param id Movement ID to delete
   * @returns Observable<void>
   */
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + this.parentId + "/movements/" + id.toString());
  }

  /**
   * Search asset movements with filtering and pagination
   * GET /assets/{assetId}/movements:search?offset=X&limit=Y&query=...
   *
   * @param pageQuery Search parameters
   * @returns Observable<PageModel<AssetMovementModel>> Paginated movements
   */
  search(pageQuery: PageQuery): Observable<PageModel<AssetMovementModel>> {
    return this.httpClient.get<PageModel<AssetMovementModel>>(this.baseUrl + this.parentId + "/movements:search?" + pageQuery.toString());
  }

  /**
   * Create new asset movement
   * POST /assets/{assetId}/movements
   *
   * @param asset Movement data to create
   * @returns Observable<AssetMovementModel> Created movement with ID
   */
  create(asset: AssetMovementModel): Observable<AssetMovementModel> {
    return this.httpClient.post<AssetMovementModel>(this.baseUrl + this.parentId + "/movements", asset);
  }

  /**
   * Update existing asset movement
   * PUT /assets/{assetId}/movements/{movementId}
   *
   * @param asset Movement data with ID to update
   * @returns Observable<AssetMovementModel> Updated movement
   */
  update(asset: AssetMovementModel): Observable<AssetMovementModel> {
    return this.httpClient.put<AssetMovementModel>(this.baseUrl + this.parentId + "/movements/" + asset.id, asset);
  }

}
