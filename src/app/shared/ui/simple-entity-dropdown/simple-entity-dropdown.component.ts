import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SimpleEntityModel } from '../simple-entity.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simple-entity-dropdown',
  imports: [CommonModule, FormsModule],
  templateUrl: './simple-entity-dropdown.component.html',
  styleUrl: './simple-entity-dropdown.component.css'
})
export class SimpleEntityDropdownComponent {
  @Input()
  list: SimpleEntityModel[] = [];
  @Input()
  valueSelected: number | null = null;
  @Output()
  onValueSelected = new EventEmitter<number>();

  onEntitySelected(event: Event) {
    this.valueSelected = Number((event.target as HTMLSelectElement).value);
    this.onValueSelected.emit(this.valueSelected);
  }
}
