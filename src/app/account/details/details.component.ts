import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccountDetailsModel } from '../model/account-details-model';
import { AccountService } from '../service/account-service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  model!: AccountDetailsModel;
  isReady: boolean = false;

  constructor(service: AccountService) {
    service.details().subscribe(model => {
      this.model = model;
      this.isReady = true;
    });
  }

}
