import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovimentAssetReturnHttpModel } from '../../model/http/moviment-asset-return-http-model';
import { AssetReturnServiceImpl } from '../../service/impl/moviment-asset-return-impl.service';
import { PageModel } from '../../model/page-model';
import { PageQuery } from '../../model/page-query';
import { MovimentAssetReturnModel } from '../../model/moviment-asset-return-model';
import { CurrencyFormatPipe } from '../../pipe/currency-format.pipe';
import { CommonModule } from '@angular/common';
import { AssetReturnMapperImpl } from '../../mapper/impl/moviment-return-mapper-impl';
import { AddReturnComponent } from '../../modal/add-return/add-return.component';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule],
  providers: [AssetReturnMapperImpl],
  templateUrl: './returns.component.html',
  styleUrl: './returns.component.css'
})
export class ReturnsComponent {
  id!: number;
  returns: MovimentAssetReturnModel[] = [];

  constructor(private service: AssetReturnServiceImpl,
    private mapper: AssetReturnMapperImpl,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }
  async ngOnInit(): Promise<void> {
    this.getRouteParams();
    this.getReturnsByAsset('-date');
  }

  async getRouteParams(): Promise<void> {
    await this.route.parent?.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.id = idString !== null ? +idString : 0;
    });
  }

  async getReturnsByAsset(sort: string | null): Promise<void> {
    this.returns = [];
    var query: PageQuery = new PageQuery();
    if (sort) {
      query.sort = sort;
    }
    query.query = "stock:" + this.id;
    this.service.assetId = +this.id;
    await this.service.getAll(query).subscribe((data: MovimentAssetReturnHttpModel[]) => {
      for (let element of data) {
        this.returns.push(this.mapper.toModel(element));
      }
    });
  }

  addReturn() {
    const modalRef = this.modalService.open(AddReturnComponent);
    modalRef.componentInstance.id = this.id;
  }

  updateReturn(model: MovimentAssetReturnModel) {
    const modalRef = this.modalService.open(AddReturnComponent);
    modalRef.componentInstance.assetId = this.id;
    modalRef.componentInstance.movimentReturn = model;
    modalRef.componentInstance.overrideValue = true;
    modalRef.componentInstance.updateOperation = true;
  }
}
