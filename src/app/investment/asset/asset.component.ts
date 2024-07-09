import { Component, Input } from '@angular/core';
import { CurrencyFormatPipe } from '../../pipe/currency-format.pipe';
import { AssetModel } from './model/asset-model';

@Component({
  selector: '[app-asset]',
  standalone: true,
  imports: [CurrencyFormatPipe],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})
export class AssetComponent {

  @Input()
  asset!: AssetModel;
}
