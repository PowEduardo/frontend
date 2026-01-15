import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageQuery } from '../../commons/base/model/page-query';
import { TableComponent } from "../../commons/base/table/table.component";
import { TableColumn } from '../../commons/model/table-column';
import { CrudService } from '../../commons/service/crud.service';
import { StatementModel } from './model/statement-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardMovementsUpsertComponent } from '../movements/card-movements-upsert/card-movements-upsert.component';
import { StatementService } from './service/statement.service';
import { TableAction } from '../../commons/model/table-action';
import { NotificationService } from '../../commons/service/notification.service';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [CommonModule, TableComponent, RouterOutlet],
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
    { key: 'closed', label: 'Closed', format: (value) => {
      if (value === undefined) {
        return 'Fatura em aberto';
      }
      return value ? 'Sim' : 'Não';
    }  }
  ];
  data: StatementModel[] = [];
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
    const page: PageQuery = new PageQuery()
    page.sort = '-referenceMonth';
    this.loading = true;
    this.service.readAll(page).subscribe({
      next: (data: StatementModel[]) => {
        this.data = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.error(`Erro ao carregar faturas: ${error.error.message}`);
      }
    });
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

  closeStatement(statement: StatementModel): void {
    this.service.close(1,statement.id).subscribe({
      next: () => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => {
        this.notificationService.error(`Erro ao fechar fatura: ${error.error.message}`);
      }
    });
  }
}
