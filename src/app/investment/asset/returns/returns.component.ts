import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementsTableComponent } from '../../../commons/base/movement/table/movements-table.component';
import { CurrencyFormatPipe } from '../../../pipe/currency-format.pipe';
import { AssetMovimentReturnMapperImpl } from '../mapper/impl/asset-moviment-return-mapper-impl';
import { AssetReturnMovementUpsertComponent } from '../modal/add-moviment/asset-return/asset-return.component';
import { AssetMovementReturnModel } from '../model/asset-movement-return-model';
import { AssetMovementReturnHttp } from '../model/http/asset-movement-return-http-model';
import { PageQuery } from '../model/page-query';
import { AssetReturnServiceImpl } from '../service/impl/moviment-asset-return-impl.service';


@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule],
  providers: [AssetMovimentReturnMapperImpl],
  templateUrl: './returns.component.html',
  styleUrl: './returns.component.css'
})
export class ReturnsComponent extends MovementsTableComponent<AssetMovementReturnModel> implements OnChanges{
@Input()
assetId!: number;
sort: string = "date"

constructor(private service: AssetReturnServiceImpl,
  private mapper: AssetMovimentReturnMapperImpl,
  private modal: NgbModal
) {
  super();
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
ngOnChanges(changes: SimpleChanges): void {
  this.getMovimentsByAsset('-date');
}

async addMoviment() {
  const modalRef = this.modal.open(AssetReturnMovementUpsertComponent);
  modalRef.componentInstance.parentId = this.assetId;
  await modalRef.result.then((result) => {
    if (result === 'saved') {
      this.getMovimentsByAsset('-date');
    }
  });
}

async getMovimentsByAsset(attribute: string) {
  if (this.sort === attribute) {
    attribute = '-' + attribute;
    this.sort = attribute;
  }
  this.movements = [];
  const query: PageQuery = new PageQuery();
  if (attribute) {
    query.sort = attribute;
  }
  this.service.parentId = this.assetId;
  await this.service.readAll(query).subscribe((data: AssetMovementReturnHttp[]) => {
    data.map(element => {
      this.movements.push(this.mapper.toModel(element));
    });
  });

}

async updateMoviment(moviment: AssetMovementReturnModel) {
  const modalRef = this.modal.open(AssetReturnMovementUpsertComponent);
  modalRef.componentInstance.parentId = this.assetId;
  modalRef.componentInstance.model = moviment;
  modalRef.componentInstance.updateOperation = true;
  await modalRef.result.then((result) => {
    if (result === 'saved') {
      this.getMovimentsByAsset('-date');
    }
  });
}
}
