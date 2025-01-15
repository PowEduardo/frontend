import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movement-type',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movement-type.component.html',
  styleUrl: './movement-type.component.css'
})
export class MovementTypeComponent {

  options: string[] = ["ASSET", "RETURN", "ACCOUNT"];
  selectedOption!: string;

  constructor(private activeModal: NgbActiveModal) {}
  
  close() {
    this.activeModal.close(this.selectedOption);
  }
}