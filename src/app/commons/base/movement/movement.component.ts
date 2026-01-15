import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovementModelInterface } from './model/movement-model-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movement',
  standalone: true,
  imports: [FormsModule],
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
