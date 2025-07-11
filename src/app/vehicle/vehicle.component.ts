import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SubmenuItem } from '../commons/page/submenu/model/submenu-item';
import { SubmenuComponent } from "../commons/page/submenu/submenu.component";
import { CrudService } from '../commons/service/crud.service';
import { VehicleModel } from './model/vehicle-model';
import { VehicleModule } from './vehicle.module';
import { PageQuery } from '../commons/base/model/page-query';
import { ChooseVehicleComponent } from "./modal/choose-vehicle/choose-vehicle.component";

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [SubmenuComponent, RouterModule, VehicleModule, ChooseVehicleComponent],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent implements OnInit {

  entities: VehicleModel[] = [];
  entitySelected: number | null = null;
  submenuItems: SubmenuItem[] = [
    { label: 'Management', route: 'management', icon: 'pi pi-fw pi-car', isDisabled: false },
    { label: 'Parts', route: 'parts', icon: 'pi pi-fw pi-cog', isDisabled: false },
    { label: 'Maintenance', route: 'maintenance', icon: 'pi pi-fw pi-wrench', isDisabled: true },
    { label: 'Fuel', route: 'fuel', icon: 'pi pi-fw pi-gas-pump', isDisabled: false }
  ]
  constructor(private service: CrudService<VehicleModel>,
    private route: ActivatedRoute,
    private router: Router
  ) {
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
      await this.loadEntities();
    }
  }

  async loadEntities() {
    const page: PageQuery = new PageQuery();
    page.sort = 'model';
    this.service.readAll(page).subscribe({
      next: entities => {
        this.entities = entities;
        if (entities.length === 1) {
          this.changeEntitySelected(entities[0].id!);
        }
      },
      error: error => {
        alert('Error loading entities: ' + error);
      }
    });
  }

  changeEntitySelected(id: number) {
    // If entitySelected is set, you are on /vehicles/:id or a child
    if (this.entitySelected) {
      // Replace only the id segment, keep children
      this.router.navigate(['../', id], {
        relativeTo: this.route,
        replaceUrl: true,
      });
    } else {
      // You are on /vehicles, go to /vehicles/:id
      this.router.navigate([id], {
        relativeTo: this.route,
        replaceUrl: true,
      });
    }
  }
}
