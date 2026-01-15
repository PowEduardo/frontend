import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { PageQuery } from '../../../../commons/base/model/page-query';
import { Crud } from '../../../../commons/base/movement/service/crud.service';
import { AssetConsolidateHttpModel } from '../../../model/http/asset-consolidate-http-model';
import { AssetModel } from '../../model/asset-model';
import { AssetDetailsModel } from '../../model/asset-model-details';
import { PageModel } from '../../model/page-model';
import { IrpfModel } from '../../irpf/model/irpf-model';
import { environment } from '../../../../../environments/environment';

/**
 * Asset Service Implementation
 *
 * Handles all CRUD operations for investment assets.
 * Provides comprehensive asset management including:
 * - Asset listing with pagination
 * - Asset creation, update, deletion
 * - Consolidated asset data by type
 * - Detailed asset information
 * - Tax (IRPF) calculations
 *
 * Base endpoint: GET /assets
 *
 * @see AssetModel
 * @see AssetDetailsModel
 * @see Crud
 */
@Injectable({
  providedIn: 'root'
})
export class AssetServiceImpl implements Crud<AssetModel> {
  private readonly httpClient = inject(HttpClient);


  /** Base API endpoint for assets */
  baseUrl: string = environment.apiBaseUrl + "/assets";

  /**
   * Get all assets with pagination
   *
   * Retrieves all assets across all pages.
   * Automatically fetches multiple pages if needed.
   * GET /assets?offset=X&limit=Y
   *
   * @param pageQuery Pagination parameters (offset, limit, query, sort)
   * @returns Observable<AssetModel[]> Complete list of all assets
   */
  getAll(pageQuery: PageQuery): Observable<AssetModel[]> {
    return this.search(pageQuery).pipe(
      mergeMap(firstPage => {
        if (firstPage.last) {
          return of(firstPage.content);
        }
        const otherPagesQueries: PageQuery[] = [];
        for (let i = 1; i < firstPage.totalPages; i++) {
          const newPage = new PageQuery();
          newPage.offset = i;
          newPage.query = pageQuery.query;
          newPage.sort = pageQuery.sort;
          otherPagesQueries.push(newPage);
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
   * Find asset by ID
   * GET /assets/{id}
   *
   * @param id Asset ID
   * @returns Observable<AssetModel> Asset data
   */
  findById(id: number): Observable<AssetModel> {
    return this.httpClient.get<AssetModel>(this.baseUrl + "/" + id);
  }

  /**
   * Create new asset
   * POST /assets
   *
   * @param asset Asset data to create
   * @returns Observable<AssetModel> Created asset with ID
   */
  create(asset: AssetModel): Observable<AssetModel> {
    return this.httpClient.post<AssetModel>(this.baseUrl, asset);
  }

  /**
   * Update existing asset
   * PUT /assets/{id}
   *
   * @param asset Asset data with ID to update
   * @returns Observable<AssetModel> Updated asset
   */
  update(asset: AssetModel): Observable<AssetModel> {
    return this.httpClient.put<AssetModel>(this.baseUrl + "/" + asset.id, asset);
  }

  /**
   * Search assets with filtering and pagination
   * GET /assets:search?offset=X&limit=Y&query=...
   *
   * @param pageQuery Search parameters (query, offset, limit, sort)
   * @returns Observable<PageModel<AssetModel>> Paginated results
   */
  search(pageQuery: PageQuery): Observable<PageModel<AssetModel>> {
    return this.httpClient.get<PageModel<AssetModel>>(this.baseUrl + ":search?" + pageQuery.toString());
  }

  /**
   * Get detailed asset information
   * GET /assets/{id}/details
   *
   * Includes movements, returns, and consolidated data.
   *
   * @param id Asset ID
   * @returns Observable<AssetDetailsModel> Detailed asset information
   */
  details(id: number): Observable<AssetDetailsModel> {
    return this.httpClient.get<AssetDetailsModel>(this.baseUrl + "/" + id + "/details");
  }

  /**
   * Get consolidated asset data by type
   * GET /assets/consolidate?type={assetType}
   *
   * Returns aggregated data for all assets of a specific type.
   *
   * @param assetType Asset type identifier (STOCKS, FUNDS, etc)
   * @returns Observable<AssetConsolidateHttpModel> Consolidated asset data
   */
  consolidated(assetType: string): Observable<AssetConsolidateHttpModel> {
    return this.httpClient.get<AssetConsolidateHttpModel>(this.baseUrl + "/consolidate", { params: { type: assetType } });
  }

  /**
   * Get IRPF (tax) data for asset
   * GET /assets/{id}/irpf?year={year}
   *
   * Retrieves Brazilian tax (IRPF) information for the asset
   * in the specified fiscal year.
   *
   * @param id Asset ID
   * @param year Fiscal year for tax calculation
   * @returns Observable<IrpfModel> IRPF/tax information
   */
  irpf(id: number, year: number): Observable<IrpfModel> {
    return this.httpClient.get<IrpfModel>(this.baseUrl + "/" + id.toString() + "/irpf", { params: { year: year } });
  }
}
