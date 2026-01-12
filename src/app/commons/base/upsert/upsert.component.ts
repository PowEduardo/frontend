import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from '../../service/crud.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-upsert',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.css'
})
export class UpsertComponent<T extends { id?: number | null}> {
  protected model!: T;
  @Input()
  public title!: string | null;
  @Output()
  public submitEventEmitter: EventEmitter<T | unknown> = new EventEmitter<T | unknown>();

  constructor(protected activeModal: NgbActiveModal,
    protected service: CrudService<T>,
    protected notificationService: NotificationService
  ) { }

  eventSubmit() {
    this.submitEventEmitter.emit();
  }

  async onSubmit() {
    if (this.model.id == null) {
      this.service.create(this.model).subscribe({
        next: (response) => {
          this.model.id = response.id;
        },
        error: (error) => {
          console.log('UpsertComponent.onSubmit error:', error);
          this.notificationService.error(error.error.message || 'An unexpected error occurred.');
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
