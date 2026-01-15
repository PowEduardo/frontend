
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpsertComponent } from '../../../../commons/base/upsert/upsert.component';
import { InstallmentModel } from '../model/installment-model';
import { CrudService } from '../../../../commons/service/crud.service';
import { InstallmentService } from '../service/installment.service';

@Component({
  selector: 'app-card-upsert',
  standalone: true,
  imports: [FormsModule],
  providers: [{provide: CrudService, useClass: InstallmentService}],
  templateUrl: './card-movement-upsert.component.html',
  styleUrl: './card-movement-upsert.component.css'
})
export class CardMovementUpsertComponent extends UpsertComponent<InstallmentModel> {

}
