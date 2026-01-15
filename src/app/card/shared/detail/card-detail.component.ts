import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../../commons/service/notification.service';
import { CardDetailsModel } from '../../model/card-details-model';
import { CardService } from '../../service/card.service';
import { CardChartComponent } from '../chart/card-chart.component';

/**
 * Card Detail Component
 * Wrapper component for card detail page
 * Displays card information, tabs for statements/movements, and chart
 */
@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, CardChartComponent],
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  card: CardDetailsModel | null = null;
  loading = true;
  cardId = 0;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cardId = params['cardId'];
      this.loadCard();
    });
  }

  /**
   * Load card details
   */
  private loadCard(): void {
    this.loading = true;
    this.cardService.getDetails(this.cardId).subscribe({
      next: (card: CardDetailsModel) => {
        this.card = card;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.error(`Erro ao carregar cartão: ${error.error.message}`);
        this.goBack();
      }
    });
  }

  /**
   * Navigate back to cards list
   */
  goBack(): void {
    this.router.navigate(['/cards']);
  }

  /**
   * Navigate to edit card
   */
  editCard(): void {
    this.router.navigate([`/cards/${this.cardId}/edit`]);
  }
}
