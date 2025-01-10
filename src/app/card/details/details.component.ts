import { Component } from '@angular/core';
import { CardDetailsModel } from '../model/account-details-model';
import { CardService } from '../service/card.service';

@Component({
  selector: 'app-details',
  standalone: false,
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
