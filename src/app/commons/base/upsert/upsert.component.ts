import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  protected model: T | any;
  @Input()
  public title!: string | null;
  @Output()
  public submitEventEmitter: EventEmitter<T | any> = new EventEmitter<T | any>();

  constructor(protected activeModal: NgbActiveModal,
    protected service: CrudService<T | any | null>
  ) { }

  eventSubmit() {
    this.submitEventEmitter.emit();
  }

  async onSubmit() {
    console.log('Deu bom');
    if (this.model.id == null) {
      this.service.create(this.model).subscribe({
        next: (response) => {
          this.model.id = response.id;
        },
        error: (error) => {
          alert(`Error: ${error.message || 'An unexpected error occurred.'}`);
          this.activeModal.close('error');
        }
      });
    } else {
      this.service.update(this.model).subscribe();
    }
    this.activeModal.close(this.model);
  }

  setModel(id: number) {
    this.service.read(id).subscribe({
      next: (response) => {
        this.model = response;
      },
      error: (error) => {
        alert(`Error: ${error.message || 'An unexpected error occurred.'}`);
        this.activeModal.close('error');
      }
    });
  }
}
