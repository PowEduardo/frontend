import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccountDetailsModel } from '../model/account-details-model';
import { AccountService } from '../service/account-service';
import { ActivatedRoute } from '@angular/router';

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
  id: number = 0;

  constructor(service: AccountService,
    route: ActivatedRoute
  ) {
    route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (isNaN(this.id)) {
        return;
      }
    });
    service.read(this.id).subscribe(model => {
      this.model = model;
      this.isReady = true;
    });
  }

}
