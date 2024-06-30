import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AssetMapperImpl } from '../../../mapper/impl/asset-mapper-impl';
import { AssetModel } from '../../../model/asset-model';
import { AssetHttpModel } from '../../../model/http/asset-http-model';
import { CurrencyFormatPipe } from '../../../pipe/currency-format.pipe';
import { AssetServiceImpl } from '../../../service/impl/asset-impl.service';
import { AssetDetailsHttpModel } from '../../../model/http/asset-details-http-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReturnComponent } from '../../../modal/add-return/add-return.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule, RouterOutlet],
  providers: [AssetMapperImpl, CurrencyPipe],
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  id!: number;
  asset!: AssetModel;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private assetService: AssetServiceImpl,
    private assetMapper: AssetMapperImpl,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadAssetData(this.id);
    });
  }

  loadAssetData(id: number): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      asset: this.assetService.findById(id),
      assetDetails: this.assetService.details(id)
    }).subscribe({
      next: ({ asset, assetDetails }) => {
        this.asset = this.assetMapper.toModel(asset);
        this.asset = this.assetMapper.toModelWithDetails(assetDetails, this.asset);
        this.loading = false;
      },
      error: err => {
        console.error('Error loading asset data', err);
        this.error = 'Error loading asset data';
        this.loading = false;
      }
    });
  }

  addReturn() {
    const modalRef = this.modalService.open(AddReturnComponent);
    modalRef.componentInstance.id = this.id;
  }

  openReturns() {
    this.router.navigate(['home', 'investments', 'assets', this.id, 'returns']);
  }
}
