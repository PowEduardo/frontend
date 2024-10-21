import { Component, Input, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../commons/base/model/page-query';
import { PageQueryModel } from '../../commons/base/model/page-query-model';
import { MovementHttp } from '../../commons/base/movement/model/http/movement-http';
import { MovementsTableComponent } from '../../commons/base/movement/table/movements-table.component';
import { AssetMovementUpsertComponent } from '../../investment/asset/modal/add-movement/asset-movement/asset-movement-upsert.component';
import { AccountMovementModel } from '../model/account-movement-model';
import { AccountMovementMapperImpl } from './mapper/account-movement-mapper-impl';
import { AccountMovementService } from './service/account-movement-service';
import { CurrencyFormatPipe } from '../../pipe/currency-format.pipe';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule],
  providers: [AccountMovementService, AccountMovementMapperImpl, NgbModal, DecimalPipe],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent extends MovementsTableComponent<AccountMovementModel>{
  
  @Input()
  parentId!: number;
  sort: string = 'date';

  constructor(private service: AccountMovementService,
    private mapper: AccountMovementMapperImpl,
    private modal: NgbModal
  ) {
    super();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(changes: SimpleChanges): void {
    this.getMovements('-date');
  }

  async addMovement() {
    const modalRef = this.modal.open(AssetMovementUpsertComponent);
    modalRef.componentInstance.parentId = this.parentId;
    await modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getMovements('-date');
      }
    });
  }

  async getMovements(attribute: string) {
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
        this.movements.push(this.mapper.toModel(element));
      });
    });

  }

  async updateMovement(movement: AccountMovementModel) {
    const modalRef = this.modal.open(AssetMovementUpsertComponent);
    modalRef.componentInstance.parentId = this.parentId;
    modalRef.componentInstance.model = movement;
    modalRef.componentInstance.updateOperation = true;
    await modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getMovements('-date');
      }
    });
  }

}
