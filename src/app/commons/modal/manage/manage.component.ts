import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage',
  standalone: false,
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  title = 'Confirm';
  message = 'Choose an option';

  constructor(public activeModal: NgbActiveModal) { }

  close(response: string): void {
    this.activeModal.close(response); // Return true on confirm
  }

}
