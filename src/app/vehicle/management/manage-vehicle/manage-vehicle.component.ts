import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-vehicle',
  standalone: false,
  templateUrl: './manage-vehicle.component.html',
  styleUrl: './manage-vehicle.component.css'
})
export class ManageVehicleComponent {
  title = 'Confirm';
  message = 'Choose an option';

  constructor(public activeModal: NgbActiveModal) { }

  close(response: string): void {
    this.activeModal.close(response); // Return true on confirm
  }

}
