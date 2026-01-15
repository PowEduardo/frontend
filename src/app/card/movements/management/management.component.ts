import { Component, inject } from '@angular/core';
import { PageQuery } from '../../../commons/base/model/page-query';
import { InstallmentModel } from '../../statement/installment/model/installment-model';
import { InstallmentService } from '../../statement/installment/service/installment.service';
import { CardMovementModel } from '../model/card-movement-model';
import { CardMovementService } from '../service/card-movement.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../commons/service/notification.service';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {
  private service = inject(CardMovementService);
  private installmentService = inject(InstallmentService);
  private notificationService = inject(NotificationService);

  model!: CardMovementModel;
  installments!: InstallmentModel[];

  constructor() {
    const service = this.service;

    service.parentId = 1;
  }

  setMovement(id: number) {
    this.service.read(id).subscribe(
      {
        next: (data: CardMovementModel) => {
          this.model = data;
        },
        error: (error) => {
          this.notificationService.error(`Erro ao carregar movimento: ${error.error.message}`);
        }
      }

    );
    const query: PageQuery = new PageQuery();
    query.addQuery('movement', id.toString());
    this.installmentService.readAll(query).subscribe(
      {
        next: (data: InstallmentModel[]) => {
          this.installments = data;
        },
        error: (error) => {
          this.notificationService.error(`Erro ao listar parcelas: ${error.error.message}`);
        }
      }

    );
  }
}
