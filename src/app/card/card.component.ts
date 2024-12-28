import { Component } from '@angular/core';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DetailsComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

}
