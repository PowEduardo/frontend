import { Component, Input } from '@angular/core';
import { AssetDetailsModel } from './model/asset-model-details';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: '[app-asset]',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})
export class AssetComponent {

  @Input()
  asset!: AssetDetailsModel;
}
