import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovementModel } from './model/movement-model';

@Component({
  selector: '[app-movement]',
  templateUrl: './movement.component.html',
  styleUrl: './movement.component.css'
})
export class MovementComponent {

  @Input()
  renderType!: string;
  @Input()
  movement!: MovementModel;
  @Output()
  valueChange = new EventEmitter<boolean>();
  @Output()
  movementChange = new EventEmitter<MovementModel>();

  emitValueChange() {
    this.valueChange.emit(true);
  }
}
