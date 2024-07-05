import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AssetMapperImpl } from '../../../mapper/impl/asset-mapper-impl';
import { AssetModel } from '../../../model/asset-model';
import { CurrencyFormatPipe } from '../../../pipe/currency-format.pipe';
import { AssetServiceImpl } from '../../../service/impl/asset-impl.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMovimentComponent } from '../../../modal/add-moviment/add-moviment.component';

@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule, RouterOutlet, AddMovimentComponent],
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
    private router: Router,
    private modalService: NgbModal
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

  openMoviments() {
    this.router.navigate(['home', 'investments', 'assets', this.id, 'moviments']);
  }

  openReturns() {
    this.router.navigate(['home', 'investments', 'assets', this.id, 'returns']);
  }

  async addMoviment() {
    const modalRef = this.modalService.open(AddMovimentComponent);
    modalRef.componentInstance.assetId = this.id;
    await modalRef.result.then((result) => {
      this.loadAssetData(this.id);
    });
  }
}
