import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage',
  standalone: true,
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  activeModal = inject(NgbActiveModal);

  title = 'Confirm';
  message = 'Choose an option';

  close(response: string): void {
    this.activeModal.close(response); // Return true on confirm
  }

}
