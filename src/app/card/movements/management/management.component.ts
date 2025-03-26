import { Component } from '@angular/core';
import { InstallmentModule } from '../installment/installment.module';
import { CardMovementModel } from '../model/card-movement-model';
import { InstallmentModel } from '../installment/model/installment-model';
import { CardMovementService } from '../service/card-movement.service';
import { InstallmentService } from '../installment/service/installment.service';
import { PageQuery } from '../../../commons/base/model/page-query';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [InstallmentModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {
  model!: CardMovementModel;
  installments!: InstallmentModel[];

  constructor(private service: CardMovementService,
    private installmentService: InstallmentService) {
      service.parentId = 1;
  }

  setMovement(id: number) {
    console.log(id);
    this.service.read(id).subscribe((data: CardMovementModel) => {
      this.model = data;
    });
    var query: PageQuery = new PageQuery();
    query.addQuery('movement', id.toString());
    this.installmentService.getAll(query).subscribe((data: InstallmentModel[]) => {
      this.installments = data;
    });
  }
}
