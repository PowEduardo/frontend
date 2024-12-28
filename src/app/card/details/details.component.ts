import { Component } from '@angular/core';
import { CardService } from '../service/card.service';
import { CardDetailsModel } from '../model/account-details-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  model!: CardDetailsModel;
  isReady: boolean = false;

  constructor(service: CardService) {
    service.details().subscribe(model => {
      this.model = model;
      this.isReady = true;
    });
  }
}
