import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountModule } from './account.module';
import { DetailsComponent } from './details/details.component';
import { AccountMovementsUpsertComponent } from './movements/account-movements-upsert/account-movements-upsert.component';
import { MovementsComponent } from "./movements/movements.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MovementsComponent, AccountModule, DetailsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  showMovements: boolean = true;
  constructor(private modalService: NgbModal) {
  }
  addMovement() {
    this.showMovements = false;
    this.modalService.open(AccountMovementsUpsertComponent).result.then(
      () => {
        this.showMovements = true;
      }
    );
  }
}
