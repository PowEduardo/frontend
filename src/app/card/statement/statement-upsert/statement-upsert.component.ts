
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatementService } from '../service/statement.service';
import { StatementModel } from '../model/statement-model';

@Component({
  selector: 'app-statement-upsert',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './statement-upsert.component.html',
  styleUrl: './statement-upsert.component.css'
})
export class StatementUpsertComponent {
  model!: StatementModel;

  constructor (private service: StatementService) {
    this.model = new StatementModel();
  }

  async onSubmit() {
    this.service.create(this.model).subscribe();
  }
}
