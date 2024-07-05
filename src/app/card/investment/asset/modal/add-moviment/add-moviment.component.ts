import { Component, Input } from '@angular/core';
import { MovimentModel } from '../../model/moviment-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetMovimentsServiceImpl } from '../../service/impl/asset-moviments-impl.service';
import { MovimentMapper } from '../../mapper/moviment-mapper';
import { MovimentAssetHttpModel } from '../../model/http/moviment-asset-http-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssetMovimentMapperImpl } from '../../mapper/impl/asset-moviment-mapper-impl';
import { AssetMovimentModel } from '../../model/asset-moviment-model';

@Component({
  selector: 'app-add-moviment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [AssetMovimentMapperImpl],
  templateUrl: './add-moviment.component.html',
  styleUrl: './add-moviment.component.css'
})
export class AddMovimentComponent {
  overrideValue: boolean = false;
  @Input()
  updateOperation: boolean = false;
  @Input()
  model!: AssetMovimentModel;
  @Input()
  assetId!: number;

  constructor(public activeModal: NgbActiveModal,
    private service: AssetMovimentsServiceImpl,
    private mapper: AssetMovimentMapperImpl
  ) {
    if (this.model === undefined) {
      this.model = new AssetMovimentModel();
    }

  }

  calculateValue() {
    if (!this.overrideValue) {
      this.model!.value = this.model!.amount * this.model!.unitValue;
    }
  }

  async onSubmit() {
    this.service.assetId = this.assetId;
    if (!this.updateOperation) {
      await this.service.create(this.mapper.toHttp(this.model!)).subscribe((data: MovimentAssetHttpModel) => {
      });
    } else {
      await this.service.update(this.mapper.toHttp(this.model!)).subscribe((data: MovimentAssetHttpModel) => {
      });
    }
    await this.activeModal.close('saved');
  }
}
