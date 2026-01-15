import { Component, OnInit, inject } from '@angular/core';
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
  private service = inject(AssetServiceImpl);
  private activeModal = inject(NgbActiveModal);
  private notificationService = inject(NotificationService);


  assets!: AssetModel[];
  selectedOption!: string;
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
