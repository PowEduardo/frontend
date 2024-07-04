import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetReturnServiceImpl } from '../../service/impl/moviment-asset-return-impl.service';
import { MovimentAssetReturnModel } from '../../model/moviment-asset-return-model';
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
  movimentReturn!: MovimentAssetReturnModel;

  constructor(public activeModal: NgbActiveModal,
    private service: AssetReturnServiceImpl,
    private mapper: AssetReturnMapperImpl
  ) {
    if (this.movimentReturn === undefined) {
      this.movimentReturn = {
        amount: 0,
        operation: '',
        unitValue: 0,
        exDividendDate: new Date(),
        id: 0,
        date: new Date(),
        value: 0,
        type: ''
      };
    }
  }

  calculateValue() {
    if (!this.overrideValue) {
      this.movimentReturn!.value = this.movimentReturn!.amount * this.movimentReturn!.unitValue;
    }
  }

  onSubmit() {
    if (!this.updateOperation) {
      this.service.create(this.mapper.toHttp(this.movimentReturn!)).subscribe((data: MovimentAssetReturnHttpModel) => {
      });
    } else {
      this.service.assetId = this.assetId;
      this.service.update(this.mapper.toHttp(this.movimentReturn!)).subscribe((data: MovimentAssetReturnHttpModel) => {
      });
    }
    this.activeModal.close();
  }
}
