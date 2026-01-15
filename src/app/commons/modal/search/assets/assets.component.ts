import { Component, OnInit } from '@angular/core';
import { AssetServiceImpl } from '../../../../investment/asset/service/impl/asset-impl.service';
import { PageQuery } from '../../../base/model/page-query';

import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetModel } from '../../../../investment/asset/model/asset-model';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.css'
})
export class AssetsComponent implements OnInit {

  assets!: AssetModel[];
  selectedOption!: string;
  constructor(private service: AssetServiceImpl,
    private activeModal: NgbActiveModal,
    private notificationService: NotificationService
  ) { }
  ngOnInit(): void {
    const page = new PageQuery();
    page.sort = "ticker";
    this.service.getAll(page).subscribe({
      next: (asset) => {
        this.assets = asset;
      },
      error: (error) => {
        this.notificationService.error(`Erro ao recuperar Assets: ${error.error.message}`);
      }
    }
    );
  }

  close() {
    this.activeModal.close(this.selectedOption);
  }

}
