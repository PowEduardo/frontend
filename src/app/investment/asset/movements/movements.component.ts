import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { MovementMapper } from '../../../commons/base/movement/mapper/movement-mapper';
import { MovementService } from '../../../commons/base/movement/service/movement.service';
import { MovementsTableComponent } from '../../../commons/base/movement/table/movements-table.component';
import { CurrencyFormatPipe } from '../../../pipe/currency-format.pipe';
import { AssetMovementMapperImpl } from '../mapper/impl/asset-movement-mapper-impl';
import { AssetMovementModel } from '../model/asset-movement-model';
import { AssetMovementHttp } from '../model/http/asset-movement-http-model';
import { PageQuery } from '../model/page-query';
import { AssetMovementsServiceImpl } from '../service/impl/asset-movements-impl.service';
import { AssetMovementUpsertComponent } from '../modal/add-movement/asset-movement/asset-movement-upsert.component';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule, MovementsTableComponent],
  providers: [{ provide: MovementService, useClass: AssetMovementsServiceImpl },
  { provide: MovementMapper, useClass: AssetMovementMapperImpl }
  ],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent extends MovementsTableComponent<AssetMovementModel, AssetMovementHttp> implements OnChanges {
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
    await this.service.readAll(query).subscribe((data: AssetMovementHttp[]) => {
      data.map(element => {
        this.movements!.push(this.mapper.toModel(element));
      });
    });
  }

  addMovements() {
    const modalRef = this.modal.open(AssetMovementUpsertComponent);
    modalRef.componentInstance.parentId = this.parentId;
  }

}
