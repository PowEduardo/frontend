import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardDetailsModel } from '../model/card-details-model';
import { CardService } from '../service/card.service';

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
