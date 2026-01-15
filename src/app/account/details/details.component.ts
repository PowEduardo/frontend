import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountDetailsModel } from '../model/account-details-model';
import { AccountService } from '../service/account-service';
import { NotificationService } from '../../commons/service/notification.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

/**
 * Account Details Component
 * Parent component that displays account information and manages navigation to child routes.
 * Handles router outlet for movements and other child components.
 * Automatically loads data based on route parameter ':accountId'.
 */
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DashboardComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {

  model!: AccountDetailsModel;
  isReady: boolean = false;
  accountId: number | null = null;
  isActive: boolean = true; // true when no child route (show details only)
  
  private routerSub?: Subscription;

  constructor(
    private service: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('accountId') || '1';
      
      if (idParam) {
        this.accountId = parseInt(idParam, 10);
      }
      
      this.loadAccountDetails();
    });

    // Initialize visibility based on whether there is an active child route
    this.isActive = !this.hasActiveChild();

    // Listen to navigation end events to update visibility
    this.routerSub = this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.isActive = !this.hasActiveChild();
      }
    });
  }

  /**
   * Cleanup on component destroy
   */
  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  /**
   * Load account details from service
   * Handles both success and error cases with notifications
   */
  private loadAccountDetails(): void {
    this.isReady = false;
    this.service.details(this.accountId).subscribe({
      next: (model) => {
        this.model = model;
        this.isReady = true;
      },
      error: (error) => {
        this.isReady = true;
        this.notificationService.error(`Erro ao carregar detalhes: ${error.message}`);
      }
    });
  }

  /**
   * Navigate to movements view
   */
  viewMovements(): void {
    this.router.navigate(['movements'], { relativeTo: this.route });
  }

  /**
   * Navigate back to accounts list
   */
  backToList(): void {
    this.router.navigate(['/accounts']);
  }

  /**
   * Check if current route has an active child route
   */
  private hasActiveChild(): boolean {
    return !!this.route.firstChild;
  }}