import { Component, Input, OnInit} from '@angular/core';
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
export class IrpfComponent implements OnInit{
  @Input()
  parentId!: number;
  model!: IrpfModel;
  constructor(private service: AssetServiceImpl) {

  }
  ngOnInit(): void {
    this.service.irpf(this.parentId, 2024).subscribe((response) => {
      console.log(response);
      this.model = response;
    });
  }


}
