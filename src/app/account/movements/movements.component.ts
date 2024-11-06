import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../commons/base/model/page-query';
import { PageQueryModel } from '../../commons/base/model/page-query-model';
import { MovementHttp } from '../../commons/base/movement/model/http/movement-http';
import { MovementsTableComponent } from '../../commons/base/movement/table/movements-table.component';
import { CurrencyFormatPipe } from '../../pipe/currency-format.pipe';
import { AccountMovementModel } from '../model/account-movement-model';
import { AccountMovementHttp } from '../model/http/account-movement-model';
import { AccountMovementMapperImpl } from './mapper/account-movement-mapper-impl';
import { AccountMovementService } from './service/account-movement-service';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule],
  providers: [AccountMovementService, AccountMovementMapperImpl, NgbModal, DecimalPipe],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent extends MovementsTableComponent<AccountMovementModel, AccountMovementHttp>{

  constructor(protected override service: AccountMovementService,
    protected override mapper: AccountMovementMapperImpl,
    protected override modal: NgbModal
  ) {
    super(service, mapper, modal);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override ngOnChanges(changes: SimpleChanges): void {
    this.getMovements('-date');
  }

  override async getMovements(attribute: string) {
    if (this.sort === attribute) {
      attribute = '-' + attribute;
      this.sort = attribute;
    }
    this.movements = [];
    const query: PageQuery = new PageQueryModel();
    if (attribute) {
      query.sort = attribute;
    }
    this.service.parentId = this.parentId;
    await this.service.readAll(query).subscribe((data: MovementHttp[]) => {
      data.map(element => {
        this.movements!.push(this.mapper.toModel(element));
      });
    });

  }

}
