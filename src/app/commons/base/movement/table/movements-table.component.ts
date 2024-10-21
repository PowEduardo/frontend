import { Component, Input } from '@angular/core';
import { MovementModel } from '../model/movement-model';

@Component({
  selector: 'app-movements',
  templateUrl: './movements-table.component.html',
  styleUrl: './movements-table.component.css'
})
export abstract class MovementsTableComponent<T extends MovementModel> {

  @Input()
  movements!: T[];

  abstract addMovement(): void;
  abstract getMovements(attribute: string): void;
  abstract updateMovement(movement: T): void;
}