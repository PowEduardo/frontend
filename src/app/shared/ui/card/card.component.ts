import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SimpleEntityModel } from '../simple-entity.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.model = changes['model']?.currentValue || {};
  }

  @Input()
  model!: SimpleEntityModel;
  @Output()
  valueSelected: EventEmitter<number> = new EventEmitter<number>();

  emitValue(value: number) {
    this.valueSelected.emit(value);
  }
}
