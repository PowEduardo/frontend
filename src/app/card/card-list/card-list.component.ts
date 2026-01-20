import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../shared/ui/table/table.component';
import { TableColumn } from '../../commons/model/table-column';
import { TableAction } from '../../commons/model/table-action';
import { CardService } from '../service/card.service';
import { CardModel } from '../model/card-model';
import { NotificationService } from '../../commons/service/notification.service';
import { PageQuery } from '../../commons/base/model/page-query';
import { Page } from '../../commons/base/model/page';

/**
 * Simple Card List Component
 * Demonstrates using TableComponent with actions and CardService.
 */
@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <div class="container-fluid mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Credit Cards</h2>
        <button class="btn btn-primary" (click)="onCreateCard()">
          <i class="bi bi-plus-lg me-2"></i> New Card
        </button>
      </div>

      @if (loading) {
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      } @else if (cards.length > 0) {
        <app-table 
          [columns]="columns"
          [data]="cards"
          [actions]="cardActions"
          (rowSelected)="onCardSelect($event)">
        </app-table>
      } @else {
        <div class="alert alert-info">No credit cards found.</div>
      }
    </div>
  `
})
export class CardListComponent implements OnInit {
  cards: CardModel[] = [];
  loading = false;
  private cardService: CardService = inject(CardService);
  private notificationService: NotificationService = inject(NotificationService);

  columns: TableColumn[] = [
    { label: 'Name', key: 'name' },
    { label: 'Statement Day', key: 'statementDay' },
    {
      label: 'Created',
      key: 'createDate',
      format: (value: unknown) => new Date(value as Date).toLocaleDateString()
    }
  ];

  cardActions: TableAction<CardModel>[] = [
    {
      label: 'Edit',
      icon: 'bi bi-pencil',
      cssClass: 'primary',
      action: (card: CardModel) => this.onEditCard(card)
    },
    {
      label: 'View',
      icon: 'bi bi-eye',
      cssClass: 'info',
      action: (card: CardModel) => this.onViewCard(card)
    },
    {
      label: 'Delete',
      icon: 'bi bi-trash',
      cssClass: 'danger',
      action: (card: CardModel) => this.onDeleteCard(card)
    }
  ];

  ngOnInit(): void {
    this.loadCards();
  }

  /**
   * Load all cards from the backend.
   */
  loadCards(): void {
    this.loading = true;
    const query = new PageQuery();

    this.cardService.search(query).subscribe({
      next: (page: Page<CardModel>) => {
        this.cards = page.content;
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.error(error.error.message);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  /**
   * Handle row selection (click).
   */
  onCardSelect(card: CardModel): void {
    this.notificationService.success(`Loaded details for ${card.name}`);
    // Navigate to card details or open modal
  }

  /**
   * Handle create action.
   */
  onCreateCard(): void {
    this.notificationService.info('Create card feature coming soon');
    // TODO: Open card creation modal
  }

  /**
   * Handle edit action.
   */
  onEditCard(card: CardModel): void {
    this.notificationService.info(`Editing card: ${card.name}`);
    // TODO: Open card edit modal
  }

  /**
   * Handle view action.
   */
  onViewCard(card: CardModel): void {
    this.notificationService.info(`Loading details for ${card.name}...`);

    this.cardService.getDetails(card.id!).subscribe({
      next: (details) => {
        this.notificationService.success(`Loaded details for ${details.name}`);
        // TODO: Open card details modal
      },
      error: (error) => {
        this.notificationService.error(error.error.message);
      }
    });
  }

  /**
   * Handle delete action.
   */
  onDeleteCard(card: CardModel): void {
    if (confirm(`Are you sure you want to delete "${card.name}"?`)) {
      this.cardService.delete(card.id!).subscribe({
        next: () => {
          this.notificationService.success(`Card "${card.name}" deleted successfully`);
          this.loadCards(); // Reload list
        }
      });
    }
  }
}
