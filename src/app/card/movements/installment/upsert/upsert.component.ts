import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstallmentModel } from '../model/installment-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InstallmentService } from '../service/installment.service';

@Component({
  selector: 'app-upsert',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.css'
})
export class UpsertComponent {
  model!: InstallmentModel;

  constructor (protected activeModal: NgbActiveModal,
      private service: InstallmentService
  ) {}

  async onSubmit() {
    this.service.update(this.model).subscribe();
    this.activeModal.close('Sucess');
  }

  setModel(model: InstallmentModel) {
    this.model = model;
  }
}
