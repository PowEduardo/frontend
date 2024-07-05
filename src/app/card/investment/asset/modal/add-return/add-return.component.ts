import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetReturnServiceImpl } from '../../service/impl/moviment-asset-return-impl.service';
import { AssetMovimentReturnModel } from '../../model/asset-moviment-return-model';
import { MovimentAssetReturnHttpModel } from '../../model/http/moviment-asset-return-http-model';
import { AssetReturnMapperImpl } from '../../mapper/impl/moviment-return-mapper-impl';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-return',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [AssetReturnMapperImpl],
  templateUrl: './add-return.component.html',
  styleUrl: './add-return.component.css'
})
export class AddReturnComponent {
  @Input()
  assetId!: number;
  overrideValue: boolean = false;
  @Input()
  updateOperation: boolean = false;
  @Input()
  movimentReturn!: AssetMovimentReturnModel;

  constructor(public activeModal: NgbActiveModal,
    private service: AssetReturnServiceImpl,
    private mapper: AssetReturnMapperImpl
  ) {
    if (this.movimentReturn === undefined) {
      this.movimentReturn = new AssetMovimentReturnModel();
    }
  }

  calculateValue() {
    if (!this.overrideValue) {
      this.movimentReturn!.value = this.movimentReturn!.amount * this.movimentReturn!.unitValue;
    }
  }

  async onSubmit() {
    if (!this.updateOperation) {
      await this.service.create(this.mapper.toHttp(this.movimentReturn!)).subscribe((data: MovimentAssetReturnHttpModel) => {
      });
    } else {
      this.service.assetId = this.assetId;
      await this.service.update(this.mapper.toHttp(this.movimentReturn!)).subscribe((data: MovimentAssetReturnHttpModel) => {
      });
    }
    this.activeModal.close('saved');
  }
}
