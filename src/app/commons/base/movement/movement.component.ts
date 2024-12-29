import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovementModelInterface } from './model/movement-model-interface';

@Component({
  selector: '[app-movement]',
  templateUrl: './movement.component.html',
  styleUrl: './movement.component.css'
})
export class MovementComponent {

  @Input()
  renderType!: string;
  @Input()
  movement!: MovementModelInterface;
  @Output()
  valueChange = new EventEmitter<boolean>();
  @Output()
  movementChange = new EventEmitter<MovementModelInterface>();

  emitValueChange() {
    this.valueChange.emit(true);
  }
}
