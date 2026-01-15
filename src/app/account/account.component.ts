import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from './service/account-service';
import { AccountDetailsModel } from './model/account-details-model';
import { NotificationService } from '../commons/service/notification.service';
import { PageQuery } from '../commons/base/model/page-query';
import { PageQueryModel } from '../commons/base/model/page-query-model';

/**
 * Account List Component
 * Displays list of all accounts and allows navigation to account details.
 * Lists all user accounts with basic information and action buttons.
 */
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  private service = inject(AccountService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  accounts: AccountDetailsModel[] = [];
  loading = true;

  /**
   * Load all accounts on component init
   */
  ngOnInit(): void {
    this.loadAccounts();
  }

  /**
   * Load all accounts from service
   */
  private loadAccounts(): void {
    this.loading = true;
    const query: PageQuery = new PageQueryModel();
    this.service.readAll(query).subscribe({
      next: (accounts: any[]) => {
        this.accounts = accounts;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error(`Erro ao carregar contas: ${error.message}`);
        this.loading = false;
      }
    });
  }

  /**
   * Navigate to account details
   * @param accountId Account ID to navigate to
   */
  viewAccount(accountId: number): void {
    this.router.navigate(['/accounts', accountId]);
  }

  /**
   * Navigate to account movements
   * @param accountId Account ID
   */
  viewMovements(accountId: number): void {
    this.router.navigate(['/accounts', accountId, 'movements']);
  }
}
