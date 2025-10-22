import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../../commons/base/model/page-query';
import { PageQueryModel } from '../../../commons/base/model/page-query-model';
import { CardMovementsUpsertComponent } from '../../movements/card-movements-upsert/card-movements-upsert.component';
import { CardMovementService } from '../../movements/service/card-movement.service';
import { InstallmentModel } from './model/installment-model';
import { InstallmentService } from './service/installment.service';
import { CardMovementUpsertComponent } from './upsert/card-movement-upsert.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-installment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './installment.component.html',
  styleUrl: './installment.component.css'
})
export class InstallmentComponent implements OnInit {

  installments!: InstallmentModel[];
  movements!: Map<number, string | null>;
  sort: string = 'id';
  ready: boolean = false;
  cardSelected!: number;

  constructor(private modalService: NgbModal,
    private service: InstallmentService,
    private movementService: CardMovementService,
    private route: ActivatedRoute
  ) {
    this.movements = new Map<number, string | null>();
  }

  async ngOnInit(): Promise<void> {
    await this.route.paramMap.subscribe(params => {
      this.cardSelected = Number(params.get('cardId'));
      this.movementService.parentId = this.cardSelected;
      // Update the baseUrl with the correct parentId
      if (isNaN(this.cardSelected)) {
        return;
      }
    });
    await this.getInstallments('id');
  }

  async getInstallments(attribute: string) {
    if (this.sort === attribute) {
      attribute = '-' + attribute;
    }
    this.sort = attribute;
    this.installments = [];
    const query: PageQuery = new PageQueryModel();
    if (attribute) {
      query.sort = attribute;
    }
    await this.service.readAll(query).subscribe(async (data: InstallmentModel[]) => {
      await Promise.all(data.map(async (element) => {
        if (this.movements.get(element.movement.id!)) {
          element.movement.description = this.movements.get(element.movement.id!)!;
        } else {
          this.movementService.read(element.movement.id!).subscribe((movement) => {
            this.movements.set(element.movement.id!, movement.description);
            element.movement = movement;
            this.installments!.push(element);
          });
        }
      }));
      this.ready = true;
    });
  }

  edit(installment: InstallmentModel) {
    const modalRef = this.modalService.open(CardMovementUpsertComponent);
    modalRef.componentInstance.setModel(installment.id);
  }

  editMovement(installment: InstallmentModel) {
    const modalRef = this.modalService.open(CardMovementsUpsertComponent);
    modalRef.componentInstance.setModel(installment.movement.id);
  }
}
