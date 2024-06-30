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

@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [CurrencyFormatPipe, CommonModule, RouterOutlet],
  providers: [AssetMapperImpl, CurrencyPipe],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})
export class AssetComponent implements OnInit {

  id!: number;
  asset!: AssetModel;

  constructor(private assetService: AssetServiceImpl,
    private assetMapper: AssetMapperImpl,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) { }
  async ngOnInit(): Promise<void> {
    await this.route.params.subscribe(params => {
      console.log(params);
      this.id = +params['id'];
      this.assetService.findById(this.id).subscribe((data: AssetHttpModel) => {
        this.asset = this.assetMapper.toModel(data);
        this.assetService.details(this.id).subscribe((data: AssetDetailsHttpModel) => {
          this.asset = this.assetMapper.toModelWithDetails(data, this.asset);
        });
      });
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
