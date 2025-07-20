import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PageQuery } from '../commons/base/model/page-query';
import { BasePage } from '../commons/base/page/base-page';
import { SubmenuComponent } from "../commons/page/submenu/submenu.component";
import { CrudService } from '../commons/service/crud.service';
import { ChooseVehicleComponent } from "./modal/choose-vehicle/choose-vehicle.component";
import { VehicleModel } from './model/vehicle-model';
import { VehicleModule } from './vehicle.module';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [SubmenuComponent, RouterModule, VehicleModule, ChooseVehicleComponent],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent extends BasePage<VehicleModel> implements OnInit {

  constructor(service: CrudService<VehicleModel>,
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

  async ngOnInit(): Promise<void> {
    await this.route.paramMap.subscribe(params => {
      this.entitySelected = Number(params.get('id'));
      // Update the baseUrl with the correct parentId
      if (isNaN(this.entitySelected)) {
        return;
      }
    });
    if (this.entitySelected) {

    } else {
      await this.loadEntities('model');
    }
  }

}
