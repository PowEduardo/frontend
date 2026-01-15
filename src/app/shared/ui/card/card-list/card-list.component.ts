import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CardComponent } from '../card.component';
import { SimpleEntityModel } from '../../simple-entity.model';

@Component({
  selector: 'app-card-list',
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent implements OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    this.list = changes['list']?.currentValue || [];
  }
  @Input()
  list: SimpleEntityModel[] = [];
  @Output()
  valueSelected = new EventEmitter<number>();

  emitValue(value: number) {
    this.valueSelected.emit(value);
  }
}
