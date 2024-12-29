import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { MovementService } from '../../../commons/base/movement/service/movement.service';
import { MovementsTableComponent } from '../../../commons/base/movement/table/movements-table.component';
import { CurrencyFormatPipe } from '../../../pipe/currency-format.pipe';
import { AssetMovementUpsertComponent } from '../modal/add-movement/asset-movement/asset-movement-upsert.component';
import { AssetMovementModel } from '../model/asset-movement-model';
import { PageQuery } from '../../../commons/base/model/page-query';
import { AssetMovementsServiceImpl } from '../service/impl/asset-movements-impl.service';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule, MovementsTableComponent],
  providers: [{ provide: MovementService, useClass: AssetMovementsServiceImpl }
  ],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent extends MovementsTableComponent<AssetMovementModel> implements OnChanges {
  @Input()
  assetType?: string;
  isReady: boolean = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
    await this.service.readAll(query).subscribe((data: AssetMovementModel[]) => {
      data.map(element => {
        this.movements!.push(element);
      });
    });
  }

  addMovements() {
    const modalRef = this.modal.open(AssetMovementUpsertComponent);
    modalRef.componentInstance.parentId = this.parentId;
  }

  updateMovements(model: AssetMovementModel) {
    const modalRef = this.modal.open(AssetMovementUpsertComponent);
    modalRef.componentInstance.parentId = this.parentId;
    modalRef.componentInstance.model = model;
  }

}
