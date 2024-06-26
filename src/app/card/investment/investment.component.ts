import { Component, OnInit } from '@angular/core';
import { InvestmentServiceImpl } from './service/impl/investment-impl.service';
import { InvestmentModel } from '../../model/investment-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css'
})
export class InvestmentComponent implements OnInit {
  headers: string[] = ["Category", "Invested", "Current Value", "Wanted Value", "Returns Value"];
  columns: InvestmentModel[] = [];

  constructor(private service: InvestmentServiceImpl) {
  }
  ngOnInit(): void {
    this.columns = this.service.getConsolidated();
  }
}
