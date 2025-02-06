import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from './card.module';
import { CardMovementsUpsertComponent } from './movements/card-movements-upsert/card-movements-upsert.component';
import { InstallmentComponent } from "./movements/installment/installment.component";
import { StatementUpsertComponent } from './statement/statement-upsert/statement-upsert.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, InstallmentComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  constructor(private modalService: NgbModal) {
  }

  addMovement() {
    const modalRef = this.modalService.open(CardMovementsUpsertComponent);
    modalRef.componentInstance.parentId = 1;
  }

  closeStatement() {
    const modalRef = this.modalService.open(StatementUpsertComponent);
  }
}
