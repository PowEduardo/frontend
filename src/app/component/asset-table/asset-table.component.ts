import { Component, OnInit } from '@angular/core';
import { AssetServiceImpl } from '../../service/impl/asset-impl.service';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';
import { PageModel } from '../../model/page-model';
import { AssetModel } from '../../model/asset-model';
import { TableModel } from '../../model/table-model';
import { AssetTable } from '../../mapper/impl/asset-table';
import { PageQuery } from '../../model/page-query';

@Component({
  selector: 'app-asset-table',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './asset-table.component.html',
  styleUrl: './asset-table.component.css'
})
export class AssetTableComponent implements OnInit {
  private allAssets!: AssetModel[];
  tableModel!: TableModel;
  constructor(private assetService: AssetServiceImpl, private tableMapper: AssetTable) { }

  ngOnInit(): void {
    this.assetService.getAll().subscribe((data: AssetModel[]) => {
      this.allAssets = data;
      this.tableModel = this.tableMapper.toTableModel(this.allAssets);

    });
    console.log(this.allAssets);
  }

}
