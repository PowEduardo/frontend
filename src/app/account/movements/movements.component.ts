import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../commons/base/model/page-query';
import { PageQueryModel } from '../../commons/base/model/page-query-model';
import { MovementsTableComponent } from '../../commons/base/movement/table/movements-table.component';
import { CurrencyFormatPipe } from '../../pipe/currency-format.pipe';
import { AccountMovementModel } from '../model/account-movement-model';
import { AccountMovementService } from './service/account-movement-service';
import { AccountMovementsUpsertComponent } from './account-movements-upsert/account-movements-upsert.component';
import { MovementService } from '../../commons/base/movement/service/movement.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule, MovementsTableComponent, MatIconModule],
  providers: [{ provide: MovementService, useClass: AccountMovementService }, NgbModal, DecimalPipe],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent extends MovementsTableComponent<AccountMovementModel> {

  constructor(protected override service: MovementService<AccountMovementModel>,
    protected override modal: NgbModal
  ) {
    super(service, modal);
  }

  override async getMovements(attribute: string) {
    if (this.sort === attribute) {
      attribute = '-' + attribute;
    }
    this.sort = attribute;
    this.movements = [];
    const query: PageQuery = new PageQueryModel();
    if (attribute) {
      query.sort = attribute;
    }
    this.service.parentId = this.parentId;
    await this.service.readAll(query).subscribe((data: AccountMovementModel[]) => {
      data.map(element => {
        this.movements!.push(element);
      });
    });
  }

  updateMovement(id: number) {
    const modalRef = this.modal.open(AccountMovementsUpsertComponent);
    modalRef.componentInstance.toUpdate(id);
  }

  deleteMovement(id: number) {
    this.service.delete(id).subscribe(() => {
      this.getMovements('-date');
    });
  }

}
