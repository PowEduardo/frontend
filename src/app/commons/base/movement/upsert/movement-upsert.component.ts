import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementModelInterface } from '../model/movement-model-interface';
import { MovementService } from '../service/movement.service';
import { UpsertComponent } from '../../upsert/upsert.component';

@Component({
  selector: 'app-movement-upsert',
  templateUrl: './movement-upsert.component.html',
  styleUrl: './movement-upsert.component.css'
})
export class MovementUpsertComponent<T extends MovementModelInterface> extends UpsertComponent<T> {
  @Input()
  override model!: T;
  @Output()
  modelChange = new EventEmitter<T>();
  movementTypes!: string[];
  @Input()
  parentId!: number;

  constructor(
    activeModal: NgbActiveModal,
    service: MovementService<T>
  ) { 
    super(activeModal, service);
  }

  override async onSubmit() {
    const service = this.service as MovementService<T>;
    service.parentId = this.parentId;
    super.onSubmit();
  }

  roundHalfUp(value: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }
}
