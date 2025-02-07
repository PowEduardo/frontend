import { Component, Input, OnInit } from '@angular/core';
import { InstallmentModule } from './installment.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstallmentService } from './service/installment.service';
import { InstallmentModel } from './model/installment-model';
import { } from "../../../pipe/currency-format.pipe";
import { PageQueryModel } from '../../../commons/base/model/page-query-model';
import { PageQuery } from '../../../commons/base/model/page-query';
import { CardMovementsUpsertComponent } from '../card-movements-upsert/card-movements-upsert.component';

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
  referenceMonth: string = '2025-03';

  constructor(private modalService: NgbModal,
    private service: InstallmentService
  ) { }

  ngOnInit(): void {
    this.getInstallments('id');
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
      });
    });
  }

  edit(movementId: number) {
    const modalRef = this.modalService.open(CardMovementsUpsertComponent);
    modalRef.componentInstance.toUpdate(movementId);
  }
}
