import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementsTableComponent } from '../../../commons/base/movement/table/movements-table.component';
import { CurrencyFormatPipe } from '../../../pipe/currency-format.pipe';
import { AssetReturnMovementUpsertComponent } from '../modal/add-movement/asset-return/asset-return.component';
import { AssetMovementReturnModel } from '../model/asset-movement-return-model';
import { PageQuery } from '../../../commons/base/model/page-query';
import { AssetReturnServiceImpl } from '../service/impl/movement-asset-return-impl.service';


@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule],
  providers: [],
  templateUrl: './returns.component.html',
  styleUrl: './returns.component.css'
})
export class ReturnsComponent extends MovementsTableComponent<AssetMovementReturnModel> implements OnChanges {
  @Input()
  assetType?: string;
  constructor(protected override service: AssetReturnServiceImpl,
    protected override modal: NgbModal
  ) {
    super(service, modal);
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
    const query: PageQuery = new PageQuery();
    if (attribute) {
      query.sort = attribute;
    }
    if (this.assetType) {
      query.addQuery("assetType", this.assetType);
    }
    this.service.parentId = this.parentId;
    await this.service.readAll(query).subscribe((data: AssetMovementReturnModel[]) => {
      data.map(element => {
        this.movements!.push(element);
      });
    });

  }

  addMovement() {
    const modalRef = this.modal.open(AssetReturnMovementUpsertComponent);
    modalRef.componentInstance.parentId = this.parentId;
  }

  updateMovements(model: AssetMovementReturnModel) {
      const modalRef = this.modal.open(AssetReturnMovementUpsertComponent);
      modalRef.componentInstance.parentId = this.parentId;
      modalRef.componentInstance.model = model;
    }

}
