import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DynamicTableComponent } from "../../component/dynamic-table/dynamic-table.component";
import { RowModel } from '../../model/row-model';
import { MovimentService } from '../../service/moviment.service';
import { PageModel } from '../../model/page-model';
import { MovimentRowMapper } from '../../model/mapper/impl/moviment-row-mapper';
import { RowMapper } from '../../model/mapper/row-mapper';

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  imports: [CommonModule, DynamicTableComponent]
})
export class AccountComponent implements OnInit {
  body: RowModel[];
  headers: string[];
  page: PageModel | undefined;
  mapper: RowMapper;

  constructor(private service: MovimentService
  ) {
    service.searchMoviments().subscribe(response => {
      this.page = response;
    });
    this.mapper = new MovimentRowMapper;
    this.body = [{ id: 10, columnValues: ["10.23", "1999-20-11", "Transport"] }];
    this.headers = ["id", "description"]
  }
  ngOnInit(): void {
  }

}
