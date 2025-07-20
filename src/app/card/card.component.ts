import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from './card.module';
import { CardMovementsUpsertComponent } from './movements/card-movements-upsert/card-movements-upsert.component';
import { InstallmentComponent } from "./movements/installment/installment.component";
import { StatementUpsertComponent } from './statement/statement-upsert/statement-upsert.component';
import { CardModel } from './model/card-model';
import { BasePage } from '../commons/base/page/base-page';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../commons/service/crud.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, InstallmentComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent extends BasePage<CardModel> {
  @Output() movementAdded = new EventEmitter<void>();
  @Output() resetVerification = new EventEmitter<void>();
  constructor(service: CrudService<CardModel>,
    route: ActivatedRoute,
    router: Router
  ) {
    super(service, route, router);
    this.submenuItems = [
      { label: 'Management', route: 'management', icon: 'pi pi-fw pi-car', isDisabled: false },
      { label: 'Parts', route: 'parts', icon: 'pi pi-fw pi-cog', isDisabled: false },
      { label: 'Maintenance', route: 'maintenance', icon: 'pi pi-fw pi-wrench', isDisabled: true },
      { label: 'Fuel', route: 'fuel', icon: 'pi pi-fw pi-gas-pump', isDisabled: false }
    ];
  }

}
