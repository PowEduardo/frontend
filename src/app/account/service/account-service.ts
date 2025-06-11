import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Page } from "../../commons/base/model/page";
import { PageQuery } from "../../commons/base/model/page-query";
import { AccountDetailsModel } from "../model/account-details-model";
import { Injectable } from "@angular/core";
import { BaseCrudService } from "../../commons/service/base-crud.service";

@Injectable({
    providedIn: 'root'
}
)
export class AccountService extends BaseCrudService<AccountDetailsModel> {
    constructor(override readonly httpClient: HttpClient) {
        super(httpClient);
    }
}
