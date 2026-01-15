import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardDetailsModel } from '../model/card-details-model';
import { CardService } from '../service/card.service';
import { NotificationService } from '../../commons/service/notification.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  model!: CardDetailsModel;
  isReady = false;

  constructor() {
    const service = inject(CardService);
    const notificationService = inject(NotificationService);

    service.getDetails(1).subscribe({
      next: (model) => {
        this.model = model;
        this.isReady = true;
      },
      error: (error) => {
        notificationService.error(`Erro ao carregar detalhes: ${error.error.message}`);
      }

    });
  }
}
