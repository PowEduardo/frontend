import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CardModel } from '../../model/card-model';
import { CardService } from '../../service/card.service';
import { NotificationService } from '../../../commons/service/notification.service';
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
  card: CardModel | null = null;
  loading: boolean = true;
  cardId: number = 0;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

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
      next: (card: CardModel) => {
        this.card = card;
        this.loading = false; 
      },
      error: () => {
        this.loading = false;
        this.notificationService.error('Erro ao carregar cartão');
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
