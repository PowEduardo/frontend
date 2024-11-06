import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Page } from "../../../commons/base/model/page";
import { PageQuery } from "../../../commons/base/model/page-query";
import { AccountDetailsModel } from "../../model/account-details-model";

export class AccountService {
    baseUrl: string = "http://localhost:8080/";
    accountId: number = 0;

    constructor(private readonly httpClient: HttpClient) {
        this.baseUrl = this.baseUrl.concat("accounts/{accountId}/movements");
    }
    create(request: AccountDetailsModel): Observable<AccountDetailsModel> {
        throw new Error("Method not implemented.");
    }
    read(id: number): Observable<AccountDetailsModel> {
        throw new Error("Method not implemented.");
    }
    readAll(pageQuery: PageQuery): Observable<AccountDetailsModel[]> {
        throw new Error("Method not implemented.");
    }
    update(request: AccountDetailsModel, id: number): Observable<AccountDetailsModel> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Observable<void> {
        throw new Error("Method not implemented.");
    }
    search(query: PageQuery): Observable<Page<AccountDetailsModel>> {
        throw new Error("Method not implemented.");
    }
    details(): Observable<AccountDetailsModel> {
        return this.httpClient.get<AccountDetailsModel>(this.baseUrl.replace("{accountId}", this.accountId.toString()) + "/details");
    }
}
