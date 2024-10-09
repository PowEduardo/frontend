import { Component, Input, SimpleChanges } from '@angular/core';
import { MovementsTableComponent } from '../../commons/base/movement/table/movements-table.component';
import { AccountMovementModel } from '../model/account-movement-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../commons/base/model/page-query';
import { AssetMovementUpsertComponent } from '../../investment/asset/modal/add-moviment/asset-moviment/asset-movement-upsert.component';
import { AssetMovementModel } from '../../investment/asset/model/asset-movement-model';
import { AssetMovementHttp } from '../../investment/asset/model/http/asset-movement-http-model';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent extends MovementsTableComponent<AccountMovementModel>{
  
  @Input()
  assetId!: number;
  @Input()
  assetType?: string;
  sort: string = 'date';

  constructor(private service: AccountMovementService,
    private mapper: AccountMovementMapper,
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

  async updateMoviment(moviment: AccountMovementModel) {
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
