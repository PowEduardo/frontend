import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementModelInterface } from '../model/movement-model-interface';
import { MovementService } from '../service/movement.service';

@Component({
  selector: 'app-movement-upsert',
  templateUrl: './movement-upsert.component.html',
  styleUrl: './movement-upsert.component.css'
})
export class MovementUpsertComponent<T extends MovementModelInterface> {

  @Input()
  model!: T;
  @Output()
  modelChange = new EventEmitter<T>();
  movementTypes!: string[];
  @Input()
  parentId!: number;

  constructor (
    protected service: MovementService<T>,
    protected activeModal: NgbActiveModal
  ) {}

  async onSubmit() {
    this.service.parentId = this.parentId;
    if (this.model.id === undefined) {
      await this.service.create(this.model).subscribe();
    } else {
      await this.service.update(this.model).subscribe();
    }
    await this.activeModal.close('saved');
  }
}
