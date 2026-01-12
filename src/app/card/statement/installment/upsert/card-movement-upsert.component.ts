
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpsertComponent } from '../../../../commons/base/upsert/upsert.component';
import { InstallmentModel } from '../model/installment-model';

@Component({
  selector: 'app-card-upsert',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card-movement-upsert.component.html',
  styleUrl: './card-movement-upsert.component.css'
})
export class CardMovementUpsertComponent extends UpsertComponent<InstallmentModel> {

}
