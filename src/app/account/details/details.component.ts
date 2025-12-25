import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountDetailsModel } from '../model/account-details-model';
import { AccountService } from '../service/account-service';
import { NotificationService } from '../../commons/service/notification.service';

/**
 * Account Details Component
 * Displays detailed account information including balance, bank details, etc.
 * Automatically loads data based on route parameter 'id'.
 */
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  model!: AccountDetailsModel;
  isReady: boolean = false;
  id: number | null = null;

  constructor(
    private service: AccountService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      
      if (idParam) {
        this.id = parseInt(idParam, 10);
      }
      
      this.loadAccountDetails();
    });
  }

  /**
   * Load account details from service
   * Handles both success and error cases with notifications
   */
  private loadAccountDetails(): void {
    this.isReady = false;
    this.service.details(this.id).subscribe({
      next: (model) => {
        this.model = model;
        this.isReady = true;
        this.notificationService.success('Account details loaded successfully');
      },
      error: (error) => {
        this.isReady = true;
        this.notificationService.error(`Failed to load account details: ${error.message}`);
      }
    });
  }
}
