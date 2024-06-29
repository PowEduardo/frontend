import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovimentAssetReturnServiceImpl } from '../../service/impl/moviment-asset-return-impl.service';
import { MovimentAssetReturnModel } from '../../model/moviment-asset-return-model';
import { MovimentAssetReturnHttpModel } from '../../model/http/moviment-asset-return-http-model';
import { MovimentReturnMapperImpl } from '../../mapper/impl/moviment-return-mapper-impl';

@Component({
  selector: 'app-add-return',
  standalone: true,
  imports: [FormsModule],
  providers: [MovimentReturnMapperImpl],
  templateUrl: './add-return.component.html',
  styleUrl: './add-return.component.css'
})
export class AddReturnComponent {
  @Input() id!: number;

  constructor(public activeModal: NgbActiveModal,
    private service: MovimentAssetReturnServiceImpl,
    private mapper: MovimentReturnMapperImpl
  ) { }
  movimentReturn: MovimentAssetReturnModel = {
    amount: 0,
    operation: '',
    unitValue: 0,
    exDividendDate: new Date(),
    id: 0,
    date: new Date(),
    value: 0,
    type: ''
  };

  overrideValue: boolean = false;

  calculateValue() {
    if (!this.overrideValue) {
      this.movimentReturn.value = this.movimentReturn.amount * this.movimentReturn.unitValue;
    }
  }

  onSubmit() {
    this.movimentReturn.id = this.id;
    this.service.create(this.mapper.toHttp(this.movimentReturn)).subscribe((data: MovimentAssetReturnHttpModel) => {
      console.log(data);
    });
  }
}
