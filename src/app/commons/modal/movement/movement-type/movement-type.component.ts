
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movement-type',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './movement-type.component.html',
  styleUrl: './movement-type.component.css'
})
export class MovementTypeComponent {
  private activeModal = inject(NgbActiveModal);


  options: string[] = ["ASSET", "RETURN", "ACCOUNT"];
  selectedOption!: string;
  
  close() {
    this.activeModal.close(this.selectedOption);
  }
}