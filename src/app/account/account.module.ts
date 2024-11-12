import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './service/account-service';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsComponent
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
