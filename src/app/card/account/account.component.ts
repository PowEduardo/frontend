import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicTableComponent } from "../../component/dynamic-table/dynamic-table.component";
import { RowModel } from '../../model/row-model';

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  imports: [CommonModule, DynamicTableComponent]
})
export class AccountComponent {
  body: RowModel[];
  headers: string[];

  constructor() {
    this.body = [{ id: 10, columnValues: ["10.23", "1999-20-11", "Transport"] }];
    this.headers = ["id", "value", "date", "category"]
  }
}
