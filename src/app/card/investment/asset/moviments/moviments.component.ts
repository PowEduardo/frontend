import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CurrencyFormatPipe } from '../../../../pipe/currency-format.pipe';
import { AssetMovimentModel } from '../model/asset-moviment-model';
import { AssetMovimentsServiceImpl } from '../service/impl/asset-moviments-impl.service';
import { AssetMovimentMapperImpl } from '../mapper/impl/asset-moviment-mapper-impl';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../model/page-query';
import { MovimentAssetHttpModel } from '../model/http/moviment-asset-http-model';
import { AddMovimentComponent } from '../modal/add-moviment/add-moviment.component';

@Component({
  selector: 'app-moviments',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule],
  providers: [],
  templateUrl: './moviments.component.html',
  styleUrl: './moviments.component.css'
})
export class MovimentsComponent implements OnInit {
  moviments: AssetMovimentModel[] = [];
  assetId!: number;

  constructor(private service: AssetMovimentsServiceImpl,
    private mapper: AssetMovimentMapperImpl,
    private route: ActivatedRoute,
    private modal: NgbModal
  ) {

  }
  async ngOnInit(): Promise<void> {
    await this.route.parent?.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.assetId = idString !== null ? +idString : 0;
    });
    this.getMovimentsByAsset('-date');
  }
  async addMoviment() {
    const modalRef = this.modal.open(AddMovimentComponent);
    modalRef.componentInstance.assetId = this.assetId;
    await modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getMovimentsByAsset('-date');
      }
    });
  }

  async getMovimentsByAsset(attribute: string) {
    this.moviments = [];
    var query: PageQuery = new PageQuery();
    if (attribute) {
      query.sort = attribute;
    }
    this.service.assetId = this.assetId;
    await this.service.getAll(query).subscribe((data: MovimentAssetHttpModel[]) => {
      data.map(element => {
        this.moviments.push(this.mapper.toModel(element));
      });
    });

  }

  updateMoviment(moviment: AssetMovimentModel) {

  }
}
