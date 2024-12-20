import { CommonModule } from '@angular/common';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementsTableComponent } from '../../../commons/base/movement/table/movements-table.component';
import { CurrencyFormatPipe } from '../../../pipe/currency-format.pipe';
import { AssetMovementReturnMapperImpl } from '../mapper/impl/asset-movement-return-mapper-impl';
import { AssetMovementReturnModel } from '../model/asset-movement-return-model';
import { AssetMovementReturnHttp } from '../model/http/asset-movement-return-http-model';
import { PageQuery } from '../model/page-query';
import { AssetReturnServiceImpl } from '../service/impl/movement-asset-return-impl.service';


@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule],
  providers: [AssetMovementReturnMapperImpl],
  templateUrl: './returns.component.html',
  styleUrl: './returns.component.css'
})
export class ReturnsComponent extends MovementsTableComponent<AssetMovementReturnModel, AssetMovementReturnHttp> implements OnChanges {

  constructor(protected override service: AssetReturnServiceImpl,
    protected override mapper: AssetMovementReturnMapperImpl,
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
    const query: PageQuery = new PageQuery();
    if (attribute) {
      query.sort = attribute;
    }
    this.service.parentId = this.parentId;
    await this.service.readAll(query).subscribe((data: AssetMovementReturnHttp[]) => {
      data.map(element => {
        this.movements!.push(this.mapper.toModel(element));
      });
    });

  }

}
