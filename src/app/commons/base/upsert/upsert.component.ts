import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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
export class UpsertComponent<T extends { id?: number | null }> {
  protected activeModal = inject(NgbActiveModal);
  protected service = inject<CrudService<T>>(CrudService);
  protected notificationService = inject(NotificationService);

  protected model!: T;
  @Input()
  public title!: string | null;
  @Output()
  public submitEventEmitter: EventEmitter<T | unknown> = new EventEmitter<T | unknown>();
  public isReady = true;

  eventSubmit() {
    this.submitEventEmitter.emit(this.model);
  }

  async onSubmit() {
    if (this.model.id == null) {
      this.service.create(this.model).subscribe({
        next: (response) => {
          this.model.id = response.id;
          this.eventSubmit();
          this.notificationService.success(`Criação feita com sucesso id: ${response.id}`);
        },
        error: (error) => {
          this.notificationService.error(error.error.message || 'An unexpected error occurred.');
          this.activeModal.close('error');
        }
      });
    } else {
      this.service.update(this.model).subscribe({
        next: (response) => {
          this.model.id = response.id;
          this.notificationService.success(`Atualização feita com sucesso id: ${response.id}`);
        },
        error: (error) => {
          this.notificationService.error(error.error.message || 'An unexpected error occurred.');
          this.activeModal.close('error');
        }
      });
    }
    this.activeModal.close(this.model);
  }

  setModel(id: number) {
    this.isReady = false;
    this.service.read(id).subscribe({
      next: (response) => {
        this.model = response;
        this.isReady = true;
      },
      error: (error) => {
        this.notificationService.error(error.error.message || 'An unexpected error occurred.');
        this.activeModal.close('error');
      }
    });
  }
}
