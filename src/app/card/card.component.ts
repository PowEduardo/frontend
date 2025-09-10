import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BasePage } from '../commons/base/page/base-page';
import { SubmenuComponent } from "../commons/page/submenu/submenu.component";
import { BaseCrudService } from '../commons/service/base-crud.service';
import { CrudService } from '../commons/service/crud.service';
import { CardListComponent } from "../shared/ui/card/card-list/card-list.component";
import { SimpleEntityDropdownComponent } from "../shared/ui/simple-entity-dropdown/simple-entity-dropdown.component";
import { SimpleEntityModel } from '../shared/ui/simple-entity.model';
import { DetailsComponent } from './details/details.component';
import { CardModel } from './model/card-model';
import { InstallmentComponent } from "./movements/installment/installment.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SubmenuComponent, CardListComponent, RouterOutlet, SimpleEntityDropdownComponent],
  providers: [
    { provide: CrudService, useClass: BaseCrudService<CardModel> }
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent extends BasePage<CardModel> implements OnInit {
  @Output() movementAdded = new EventEmitter<void>();
  @Output() resetVerification = new EventEmitter<void>();
  list: SimpleEntityModel[] = [];
  constructor(service: CrudService<CardModel>,
    route: ActivatedRoute,
    router: Router
  ) {
    super(service, route, router);
    this.submenuItems = [
      { label: 'Management', route: '', icon: 'pi pi-fw pi-car', isDisabled: false },
      { label: 'Statement', route: 'statements', icon: 'pi pi-fw pi-cog', isDisabled: false },
    ];
  }
  async ngOnInit(): Promise<void> {
    await this.route.paramMap.subscribe(params => {
      this.entitySelected = Number(params.get('id'));
      console.log(this.entitySelected);
      // Update the baseUrl with the correct parentId
      if (isNaN(this.entitySelected)) {
        return;
      }
    });
    if (this.entitySelected) {
    } else {
      await this.loadEntities();
      this.entities.forEach(entity => {
        this.list.push({ id: entity.id!, title: entity.name });
      });
      this.pageReady = true;
    }
    this.list.push({ id: 0, title: '+' });
  }

  receive(id: number): void {
    this.entitySelected = id;
    this.router.navigate(['cards', this.entitySelected, 'statements']);
  }

}
