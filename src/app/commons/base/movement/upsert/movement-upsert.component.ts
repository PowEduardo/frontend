import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpsertComponent } from '../../upsert/upsert.component';
import { MovementModelInterface } from '../model/movement-model-interface';
import { MovementService } from '../service/movement.service';

@Component({
  selector: 'app-movement-upsert',
  standalone: false,
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

  override async onSubmit() {
    const service = this.service as MovementService<T>;
    service.parentId = this.parentId;
    super.onSubmit();
  }

  roundHalfUp(value: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }

  override setModel(id: number) {
    const service = this.service as MovementService<T>;
    service.parentId = this.parentId;
    super.setModel(id);
  }
}
