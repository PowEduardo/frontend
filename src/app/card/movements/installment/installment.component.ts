import { Component, Input, OnInit } from '@angular/core';
import { InstallmentModule } from './installment.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstallmentService } from './service/installment.service';
import { InstallmentModel } from './model/installment-model';
import { } from "../../../pipe/currency-format.pipe";
import { PageQueryModel } from '../../../commons/base/model/page-query-model';
import { PageQuery } from '../../../commons/base/model/page-query';

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
  parentId: number = 4549;

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
    if (attribute) {
      query.sort = attribute;
    }
    this.service.parentId = this.parentId;
    await this.service.getAll(query).subscribe((data: InstallmentModel[]) => {
      data.map(element => {
        this.installments!.push(element);
      });
    });
  }
}
