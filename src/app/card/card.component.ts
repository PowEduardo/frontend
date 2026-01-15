import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BasePage } from '../commons/base/page/base-page';
import { CrudService } from '../commons/service/crud.service';
import { SubmenuComponent } from "../commons/page/submenu/submenu.component";
import { CardListComponent } from "../shared/ui/card/card-list/card-list.component";
import { SimpleEntityDropdownComponent } from "../shared/ui/simple-entity-dropdown/simple-entity-dropdown.component";
import { SimpleEntityModel } from '../shared/ui/simple-entity.model';
import { CardModel } from './model/card-model';
import { CardService } from './service/card.service';
import { CardChartComponent } from './shared/chart/card-chart.component';

/**
 * Card management component.
 * Lists all credit cards and provides navigation to card details/statements.
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SubmenuComponent, CardListComponent, RouterOutlet, SimpleEntityDropdownComponent, CardChartComponent],
  providers: [{provide: CrudService, useClass: CardService}],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent extends BasePage<CardModel> implements OnInit {
  
  @Output() movementAdded = new EventEmitter<void>();
  @Output() resetVerification = new EventEmitter<void>();
  
  list: SimpleEntityModel[] = [];
  cardService: CardService;

  constructor() {
    const service = inject<CrudService<CardModel>>(CrudService);
    const route = inject(ActivatedRoute);
    const router = inject(Router);

    super(service, route, router);
    this.cardService = service as CardService;
    this.submenuItems = [
      { label: 'Management', route: '', icon: 'pi pi-fw pi-credit-card', isDisabled: false },
      { label: 'Statements', route: 'statements', icon: 'pi pi-fw pi-list', isDisabled: false },
    ];
  }

  async ngOnInit(): Promise<void> {
    await this.route.paramMap.subscribe(params => {
      this.entitySelected = Number(params.get('cardId'));
      if (isNaN(this.entitySelected)) {
        this.entitySelected = 0;
      }
    });

    if (this.entitySelected && this.entitySelected > 0) {
      this.pageReady = true;
    } else {
      // Load all cards
      await this.loadEntities();
      this.entities.forEach(entity => {
        this.list.push({ id: entity.id!, title: entity.name });
      });
      this.pageReady = true;
    }
    
    // Add "Create New" option
    this.list.push({ id: 0, title: '+' });
  }

  /**
   * Handle card selection from dropdown.
   */
  receive(id: number): void {
    this.entitySelected = id;
    this.router.navigate(['cards', this.entitySelected, 'statements']);
  }
}
