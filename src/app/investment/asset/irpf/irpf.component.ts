import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetServiceImpl } from '../service/impl/asset-impl.service';
import { IrpfModel } from './model/irpf-model';
import { NotificationService } from '../../../commons/service/notification.service';

/**
 * Displays IRPF (Brazilian tax) information for an asset
 * Shows historical data and tax calculations
 */
@Component({
  selector: 'app-irpf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './irpf.component.html',
  styleUrl: './irpf.component.css'
})
export class IrpfComponent implements OnInit {
  private service = inject(AssetServiceImpl);
  private notificationService = inject(NotificationService);

  @Input() parentId!: number;

  model: IrpfModel | null = null;
  ticker = '';
  loading = false;

  /**
   * Load IRPF data for the asset
   */
  ngOnInit(): void {
    this.loading = true;

    this.service.irpf(this.parentId, 2025).subscribe({
      next: (response) => {
        this.model = response;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error(`Erro ao recuperar IRPF: ${error.error.message}`);
        this.loading = false;
      }
    });

    this.service.findById(this.parentId).subscribe({
      next: (response) => {
        this.ticker = response.ticker;
      },
      error: (error) => this.notificationService.error(`Erro ao recuperar Asset: ${error.error.message}`)
    });
  }
}
