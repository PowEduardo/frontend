import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../../commons/base/model/page-query';
import { PageQueryModel } from '../../../commons/base/model/page-query-model';
import { CardMovementsUpsertComponent } from '../card-movements-upsert/card-movements-upsert.component';
import { CardMovementService } from '../service/card-movement.service';
import { InstallmentModel } from './model/installment-model';
import { InstallmentService } from './service/installment.service';
import { CardMovementUpsertComponent } from './upsert/card-movement-upsert.component';

@Component({
  selector: 'app-installment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './installment.component.html',
  styleUrl: './installment.component.css'
})
export class InstallmentComponent implements OnInit {

  installments!: InstallmentModel[];
  sort: string = 'id';
  @Input()
  referenceMonth: string = '2025-08';
  @Input() movementAdded!: EventEmitter<void>;
  @Input() resetVerification!: EventEmitter<void>;
  ready: boolean = false;

  constructor(private modalService: NgbModal,
    private service: InstallmentService,
    private movementService: CardMovementService
  ) { 
    movementService.parentId = 1;
  }

  ngOnInit(): void {
    this.getInstallments('id');
    this.movementAdded.subscribe(() => {
      this.onMovementAdded();
    });
    this.resetVerification.subscribe(() => {
      this.onMovementAdded();
    });
  }

  async getInstallments(attribute: string) {
    if (this.sort === attribute) {
      attribute = '-' + attribute;
    }
    this.sort = attribute;
    this.installments = [];
    const query: PageQuery = new PageQueryModel();
    query.addQuery('referenceMonth', this.referenceMonth);
    if (attribute) {
      query.sort = attribute;
    }
    await this.service.readAll(query).subscribe((data: InstallmentModel[]) => {
      data.forEach(element => {
        this.movementService.read(element.movement.id!).subscribe((movement) => {
          element.movement = movement;
        this.installments!.push(element);
        });
      });
    });
    this.ready = true;
  }

  edit(installment: InstallmentModel) {
    const modalRef = this.modalService.open(CardMovementUpsertComponent);
    modalRef.componentInstance.setModel(installment.id);
  }

  onMovementAdded() {
    this.sort = 'id';
    this.getInstallments('id');
  }

  editMovement(installment: InstallmentModel) {
    const modalRef = this.modalService.open(CardMovementsUpsertComponent);
    modalRef.componentInstance.setModel(installment.movement.id);
  }
}
