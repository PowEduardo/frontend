import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Page } from '../../commons/base/model/page';
import { PageQuery } from '../../commons/base/model/page-query';
import { PageQueryModel } from '../../commons/base/model/page-query-model';
import { TableAction } from '../../commons/model/table-action';
import { TableColumn } from '../../commons/model/table-column';
import { CrudService } from '../../commons/service/crud.service';
import { NotificationService } from '../../commons/service/notification.service';
import { TablePaginatedComponent } from "../../shared/ui/table-paginated/table-paginated.component";
import { CardMovementsUpsertComponent } from '../movements/card-movements-upsert/card-movements-upsert.component';
import { StatementModel } from './model/statement-model';
import { StatementService } from './service/statement.service';
import { StatementValidationModalComponent } from './components/statement-validation-modal.component';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TablePaginatedComponent],
  providers: [{ provide: CrudService, useClass: StatementService }],
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit, OnDestroy {
  protected service = inject(StatementService);
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  protected modal = inject(NgbModal);
  protected notificationService = inject(NotificationService);



  columns: TableColumn[] = [
    { key: 'id', label: 'Id' },
    { key: 'referenceMonth', label: 'Reference Month' },
    { key: 'value', label: 'Value' },
    { key: 'discounts', label: 'Discount' },
    {
      key: 'closed', label: 'Closed', format: (value) => {
        if (value === undefined) {
          return 'Fatura em aberto';
        }
        return value ? 'Sim' : 'Não';
      }
    }
  ];
  data!: Page<StatementModel>;
  isActive = true; // true when no active child route (show table)
  loading = true; // show spinner while loading statements
  private routerSub?: Subscription;

  statementActions: TableAction<StatementModel>[] = [
    {
      label: 'Fechar Fatura',
      icon: 'bi bi-pencil',
      cssClass: 'primary',
      action: (statement: StatementModel) => this.closeStatement(statement)
    }
  ];

  ngOnInit(): void {
    this.loading = true;
    this.searchData(0);
    this.loading = false;
    // initialize visibility based on whether there is an active child
    this.isActive = !this.hasActiveChild();

    // listen to navigation end events to update visibility when child routes activate/deactivate
    this.routerSub = this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.isActive = !this.hasActiveChild();
      }
    });
  }
  onValueSelected(entity: StatementModel) {
    this.router.navigate([entity.id, 'installments'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  private hasActiveChild(): boolean {
    // if this route has a firstChild, a child route is active
    return !!this.route.firstChild;
  }

  onAddMovement() {
    this.modal.open(CardMovementsUpsertComponent, { size: 'lg', centered: true });
  }

  validateStatement(statement: StatementModel): void {
    // Open validation modal - works for both open and closed statements
    const modalRef = this.modal.open(StatementValidationModalComponent, { 
      size: 'lg', 
      centered: true,
      backdrop: 'static' 
    });

    modalRef.componentInstance.statement = statement;
    modalRef.componentInstance.cardId = 1; // TODO: Get from route params or context

    modalRef.result.then(
      () => {
        // Modal closed successfully
        this.searchData(0); // Refresh data
      },
      () => {
        // Modal dismissed
      }
    );
  }

  closeStatement(statement: StatementModel): void {
    this.service.close(1, statement.id).subscribe({
      next: () => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => {
        this.notificationService.error(`Erro ao fechar fatura: ${error.error.message}`);
      }
    });
  }

  searchData(page: number): void {
    this.loading = true;

    const query: PageQuery = new PageQueryModel();
    query.sort = '-referenceMonth';
    query.offset = page;

    this.service.search(query).subscribe({
      next: (data: Page<StatementModel>) => {
        this.data = data;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error(`Erro ao carregar faturas: ${error.error.message}`);
        this.loading = false;
      }
    });
  }
}
