import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { BaseCrudService } from "../../commons/service/base-crud.service";
import { AccountDetailsModel } from "../model/account-details-model";

/**
 * Service for Account API operations.
 * Extends BaseCrudService for standardized CRUD operations.
 * Provides additional custom methods for account-specific operations.
 * 
 * Base endpoint: GET /api/v1/accounts
 */
@Injectable({
    providedIn: 'root'
})
export class AccountService extends BaseCrudService<AccountDetailsModel> {

    constructor() {
        super();
        this.baseUrl = environment.apiBaseUrl + '/api/v1/accounts';
    }

    /**
     * GET /api/v1/accounts/{id}/details
     * Get detailed account info with balance and all account information.
     * 
     * @param id Account ID (if null, gets default account)
     * @returns Observable<AccountDetailsModel> with complete account details
     * @example
     * this.accountService.details(1).subscribe(account => {
     *   console.log(account.balance);
     * });
     */
    details(id: number | null): Observable<AccountDetailsModel> {
        if (id === null) {
            return this.httpClient.get<AccountDetailsModel>(`${this.baseUrl}/details`);
        }
        return this.httpClient.get<AccountDetailsModel>(`${this.baseUrl}/${id}/details`);
    }
}
