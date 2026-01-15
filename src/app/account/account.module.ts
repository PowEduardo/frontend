import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DetailsComponent } from './details/details.component';
import { AccountMovementsUpsertComponent } from './movements/account-movements-upsert/account-movements-upsert.component';
import { AccountMovementService } from './movements/service/account-movement-service';
import { AccountService } from './service/account-service';

/**
 * Account Module
 * 
 * DEPRECATED: This module is maintained for backward compatibility only.
 * 
 * All components are now standalone (see: account.component.ts).
 * Services are provided at root level:
 * - AccountService: providedIn: 'root'
 * - AccountMovementService: provided in component/standalone
 * 
 * For new components, use standalone approach instead:
 * @Component({
 *   selector: 'app-account',
 *   standalone: true,
 *   imports: [CommonModule, SomeService],
 *   providers: [SomeService]
 * })
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsComponent,
    AccountMovementsUpsertComponent
  ],
  exports: [
    CommonModule,
    DetailsComponent,
    AccountMovementsUpsertComponent
  ],
  providers: [
    AccountService,
    AccountMovementService
  ]
})
export class AccountModule {}

