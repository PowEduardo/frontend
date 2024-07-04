import { Component, Input } from '@angular/core';
import { AssetModel } from '../../model/asset-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetServiceImpl } from '../../service/impl/asset-impl.service';
import { AssetMapperImpl } from '../../mapper/impl/asset-mapper-impl';
import { AssetHttpModel } from '../../model/http/asset-http-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AssetMapperImpl, AssetServiceImpl],
  templateUrl: './add-asset.component.html',
  styleUrl: './add-asset.component.css'
})
export class AddAssetComponent {
  overrideValue: boolean = false;
  @Input()
  updateOperation: boolean = false;
  @Input()
  model!: AssetModel;

  constructor(public activeModal: NgbActiveModal,
    private service: AssetServiceImpl,
    private mapper: AssetMapperImpl
  ) {
    if (this.model === undefined) {
      this.model = new AssetModel();
      this.model.ticker = '';
      this.model.type = '';
      this.model.value = 0;
    }

  }

  onSubmit() {
    if (!this.updateOperation) {
      this.service.create(this.mapper.toHttp(this.model!)).subscribe((data: AssetHttpModel) => {
      });
    } else {
      this.service.update(this.mapper.toHttp(this.model!)).subscribe((data: AssetHttpModel) => {
      });
    }
    this.activeModal.close();
  }
}
