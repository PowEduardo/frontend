import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { InstallmentModule } from './installment.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstallmentService } from './service/installment.service';
import { InstallmentModel } from './model/installment-model';
import { } from "../../../pipe/currency-format.pipe";
import { PageQueryModel } from '../../../commons/base/model/page-query-model';
import { PageQuery } from '../../../commons/base/model/page-query';
import { UpsertComponent } from './upsert/upsert.component';
import { CardMovementService } from '../service/card-movement.service';
import { ManagementComponent } from '../management/management.component';

@Component({
  selector: 'app-installment',
  standalone: true,
  imports: [InstallmentModule],
  templateUrl: './installment.component.html',
  styleUrl: './installment.component.css'
})
export class InstallmentComponent implements OnInit {

  installments!: InstallmentModel[];
  sort: string = 'id';
  @Input()
  referenceMonth: string = '2025-05';
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
    await this.service.getAll(query).subscribe((data: InstallmentModel[]) => {
      data.map(element => {
        this.installments!.push(element);
        this.movementService.read(element.movement.id!).subscribe((movement) => {
          element.movement = movement;
        });
      });
    });
    this.ready = true;
  }

  edit(installment: InstallmentModel) {
    const modalRef = this.modalService.open(UpsertComponent);
    modalRef.componentInstance.setModel(installment);
  }

  onMovementAdded() {
    this.sort = 'id';
    this.getInstallments('id');
  }

  editMovement(installment: InstallmentModel) {
    const modalRef = this.modalService.open(ManagementComponent);
    modalRef.componentInstance.setMovement(installment.movement.id);
  }
}
