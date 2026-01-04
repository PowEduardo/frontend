import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetServiceImpl } from '../service/impl/asset-impl.service';
import { IrpfModel } from './model/irpf-model';

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
  @Input() parentId!: number;
  
  model: IrpfModel | null = null;
  ticker: string = '';
  loading: boolean = false;

  constructor(private service: AssetServiceImpl) {}

  /**
   * Load IRPF data for the asset
   */
  ngOnInit(): void {
    this.loading = true;
    
    this.service.irpf(this.parentId, 2024).subscribe({
      next: (response) => {
        this.model = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading IRPF data:', error);
        this.loading = false;
      }
    });

    this.service.findById(this.parentId).subscribe({
      next: (response) => {
        this.ticker = response.ticker;
      },
      error: (error) => console.error('Error loading asset:', error)
    });
  }
}
