import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../commons/model/table-column';
import { TableComponent } from "../../commons/base/table/table.component";
import { StatementModel } from './model/statement-model';
import { CrudService } from '../../commons/service/crud.service';
import { PageQuery } from '../../commons/base/model/page-query';

@Component({
  selector: 'app-statement',
  imports: [TableComponent],
  templateUrl: './statement.component.html',
  styleUrl: './statement.component.css'
})
export class StatementComponent implements OnInit{
  
  columns: TableColumn[] = [{key: 'referenceMonth', label: 'Reference Month'}];
  data: StatementModel[] = [];

  constructor (private service: CrudService<StatementModel>) {
  }

  ngOnInit(): void {
    this.service.readAll(new PageQuery()).subscribe(data => {
      this.data = data;
    });
  }
  
  onValueSelected(event: Event) {
    
  }
}
