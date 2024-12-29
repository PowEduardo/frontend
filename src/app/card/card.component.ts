import { Component } from '@angular/core';
import { DetailsComponent } from './details/details.component';
import { CardModule } from './card.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardMovementsUpsertComponent } from './movements/card-movements-upsert/card-movements-upsert.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DetailsComponent, CardModule],
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
}
