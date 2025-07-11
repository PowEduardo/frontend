import { Component, OnInit } from '@angular/core';
import { AssetServiceImpl } from '../../../../investment/asset/service/impl/asset-impl.service';
import { AssetDetailsModel } from '../../../../investment/asset/model/asset-model-details';
import { PageQuery } from '../../../base/model/page-query';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AssetModel } from '../../../../investment/asset/model/asset-model';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.css'
})
export class AssetsComponent implements OnInit{

  assets!: AssetModel[];
  selectedOption!: string;
  constructor(private service: AssetServiceImpl,
    private activeModal: NgbActiveModal
  ) {}
  ngOnInit(): void {
    const page = new PageQuery();
    page.sort = "ticker";
    this.service.getAll(page).subscribe((asset) => {
      this.assets = asset;
    });
  }

  close() {
    this.activeModal.close(this.selectedOption);
  }

}
