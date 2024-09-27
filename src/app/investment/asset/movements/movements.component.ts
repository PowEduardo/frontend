import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementsTableComponent } from '../../../commons/base/movement/table/movements-table.component';
import { CurrencyFormatPipe } from '../../../pipe/currency-format.pipe';
import { AssetMovementMapperImpl } from '../mapper/impl/asset-movement-mapper-impl';
import { AssetMovementUpsertComponent } from '../modal/add-moviment/asset-moviment/asset-movement-upsert.component';
import { AssetMovementModel } from '../model/asset-movement-model';
import { AssetMovementHttp } from '../model/http/asset-movement-http-model';
import { PageQuery } from '../model/page-query';
import { AssetMovementsServiceImpl } from '../service/impl/asset-movements-impl.service';

@Component({
  selector: 'app-moviments',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule],
  providers: [],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent extends MovementsTableComponent<AssetMovementModel> implements OnChanges {
  @Input()
  assetId!: number;
  @Input()
  assetType?: string;
  sort: string = 'date';

  constructor(private service: AssetMovementsServiceImpl,
    private mapper: AssetMovementMapperImpl,
    private modal: NgbModal
  ) {
    super();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(changes: SimpleChanges): void {
    this.getMovementsByAsset('-date');
  }

  async addMoviment() {
    const modalRef = this.modal.open(AssetMovementUpsertComponent);
    modalRef.componentInstance.parentId = this.assetId;
    await modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getMovementsByAsset('-date');
      }
    });
  }

  async getMovementsByAsset(attribute: string) {
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
    this.service.parentId = this.assetId;
    await this.service.readAll(query).subscribe((data: AssetMovementHttp[]) => {
      data.map(element => {
        this.movements.push(this.mapper.toModel(element));
      });
    });

  }

  async updateMoviment(moviment: AssetMovementModel) {
    const modalRef = this.modal.open(AssetMovementUpsertComponent);
    modalRef.componentInstance.parentId = this.assetId;
    modalRef.componentInstance.model = moviment;
    modalRef.componentInstance.updateOperation = true;
    await modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getMovementsByAsset('-date');
      }
    });
  }
}
