import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AssetModel } from '../../../model/asset-model';
import { AssetServiceImpl } from '../../../service/impl/asset-impl.service';
import { AssetHttpModel } from '../../../model/http/asset-http-model';
import { AssetMapperImpl } from '../../../mapper/impl/asset-mapper-impl';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  providers: [AssetMapperImpl, CurrencyPipe],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})
export class AssetComponent implements OnChanges {

  @Input()
  assetId!: number;
  asset!: AssetModel;

  constructor(private assetService: AssetServiceImpl,
    private assetMapper: AssetMapperImpl
  ) { }
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    await this.assetService.findById(this.assetId).subscribe((data: AssetHttpModel) => {
      console.log(data);
      this.asset = this.assetMapper.toModel(data);
    });
  }
}
