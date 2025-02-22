import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() movementAdded = new EventEmitter<void>();
  @Output() resetVerification = new EventEmitter<void>();
  constructor(private modalService: NgbModal) {
  }

  addMovement() {
    const modalRef = this.modalService.open(CardMovementsUpsertComponent);
    modalRef.componentInstance.parentId = 1;
    modalRef.result.then(() => {
      this.movementAdded.emit();
    });
  }

  closeStatement() {
    const modalRef = this.modalService.open(StatementUpsertComponent);
  }

}
