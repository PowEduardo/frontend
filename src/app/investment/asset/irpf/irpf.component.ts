import { Component, Input, OnInit } from '@angular/core';
import { AssetServiceImpl } from '../service/impl/asset-impl.service';
import { IrpfModel } from './model/irpf-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-irpf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './irpf.component.html',
  styleUrl: './irpf.component.css'
})
export class IrpfComponent implements OnInit {
  @Input()
  parentId!: number;
  model!: IrpfModel;
  ticker!: string;
  constructor(private service: AssetServiceImpl) {

  }
  async ngOnInit(): Promise<void> {
    await this.service.irpf(this.parentId, 2024).subscribe((response) => {
      this.model = response;
    });
    await this.service.findById(this.parentId).subscribe((response) => {
      this.ticker = response.ticker;
    });
  }


}
