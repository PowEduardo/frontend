import { Component } from '@angular/core';
import { SubmenuComponent } from "../commons/page/submenu/submenu.component";
import { RouterModule } from '@angular/router';
import { SubmenuItem } from '../commons/page/submenu/model/submenu-item';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [SubmenuComponent, RouterModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {

  submenuItems: SubmenuItem[] = [
    { label: 'Management', route: 'management', icon: 'pi pi-fw pi-car', isDisabled: false },
    { label: 'Parts', route: 'parts', icon: 'pi pi-fw pi-cog', isDisabled: false },
    { label: 'Maintenance', route: 'maintenance', icon: 'pi pi-fw pi-wrench', isDisabled: true },
    { label: 'Fuel', route: 'fuel', icon: 'pi pi-fw pi-gas-pump', isDisabled: false }
  ]
  constructor() {

  }

}
