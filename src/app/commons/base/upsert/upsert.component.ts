import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from '../../service/crud.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upsert',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.css'
})
export class UpsertComponent<T> {
  model: T | any;
  title!: string | null;

  constructor(protected activeModal: NgbActiveModal,
    protected service: CrudService<T | any | null>
  ) {}

  async onSubmit() {
    if (this.model.id == null) {
      this.service.create(this.model).subscribe(response => {
        this.model.id = response.id;
      }, error => {
        alert(`Error: ${error.message || 'An unexpected error occurred.'}`);
        this.activeModal.close('error');
      });
    } else {
      this.service.update(this.model).subscribe();
    }
    this.activeModal.close(this.model);
  }

  setModel(model: T) {
    this.model = model;
  }
}
