import { Component, OnInit } from '@angular/core';
import { AssetServiceImpl } from '../../../../investment/asset/service/impl/asset-impl.service';
import { AssetModel } from '../../../../investment/asset/model/asset-model';
import { PageQuery } from '../../../base/model/page-query';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    this.service.getAll(new PageQuery()).subscribe((asset) => {
      this.assets = asset;
    });
  }

  close() {
    this.activeModal.close(this.selectedOption);
  }

}
