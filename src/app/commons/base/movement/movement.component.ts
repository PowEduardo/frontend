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
  moviment!: MovementModel;
  @Output()
  valueChange = new EventEmitter<boolean>();
  @Output()
  movimentChange = new EventEmitter<MovementModel>();

  emitValueChange() {
    this.valueChange.emit(true);
  }
}
