import { Component, Input } from '@angular/core';
import { AssetDetailsModel } from './model/asset-model-details';

/**
 * @deprecated
 * Asset Component has been deprecated as of Phase X.5.
 * This component was used as a table row directive ([app-asset]).
 * Use the standardized <app-table> component instead.
 * 
 * See: investment/asset/details/asset-type-details.component.ts for example
 */
@Component({
  selector: '[app-asset]',
  standalone: true,
  imports: [],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})
export class AssetComponent {

  @Input()
  asset!: AssetDetailsModel;
}
