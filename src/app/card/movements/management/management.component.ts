import { Component } from '@angular/core';
import { PageQuery } from '../../../commons/base/model/page-query';
import { InstallmentModel } from '../installment/model/installment-model';
import { InstallmentService } from '../installment/service/installment.service';
import { CardMovementModel } from '../model/card-movement-model';
import { CardMovementService } from '../service/card-movement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [CommonModule],
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
    this.service.read(id).subscribe((data: CardMovementModel) => {
      this.model = data;
    });
    var query: PageQuery = new PageQuery();
    query.addQuery('movement', id.toString());
    this.installmentService.readAll(query).subscribe((data: InstallmentModel[]) => {
      this.installments = data;
    });
  }
}
