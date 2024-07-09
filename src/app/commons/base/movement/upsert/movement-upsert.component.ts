import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovementModel } from '../model/movement-model';
import { MovementService } from '../service/movement.service';
import { MovementMapper } from '../mapper/movement-mapper';
import { MovementHttp } from '../model/http/movement-http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movement-upsert',
  templateUrl: './movement-upsert.component.html',
  styleUrl: './movement-upsert.component.css'
})
export class MovementUpsertComponent<T extends MovementModel, Y extends MovementHttp> {

  @Input()
  model!: T;
  @Output()
  modelChange = new EventEmitter<T>();
  movimentTypes!: string[];
  @Input()
  parentId!: number;

  constructor (
    protected service: MovementService<Y>,
    protected mapper: MovementMapper<T, Y>,
    protected activeModal: NgbActiveModal
  ) {}

  async onSubmit() {
    this.service.parentId = this.parentId;
    if (this.model.id === undefined) {
      await this.service.create(this.mapper.toHttp(this.model)).subscribe();
    } else {
      await this.service.update(this.mapper.toHttp(this.model), this.parentId).subscribe();
    }
    await this.activeModal.close('saved');
  }
}
