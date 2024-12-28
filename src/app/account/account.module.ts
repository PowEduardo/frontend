import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DetailsComponent } from './details/details.component';
import { AccountMovementsUpsertComponent } from './movements/account-movements-upsert/account-movements-upsert.component';
import { AccountMovementService } from './movements/service/account-movement-service';
import { AccountService } from './service/account-service';



@NgModule({
  declarations: [],
  imports: [
    DetailsComponent,
    AccountMovementsUpsertComponent
  ],
  exports: [
    CommonModule
  ],
  providers: [
    AccountService,
    AccountMovementService
  ]
})
export class AccountModule { }
